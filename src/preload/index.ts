import {
  DesktopCapturerSource,
  IpcRendererEvent,
  contextBridge,
  ipcRenderer
} from 'electron';
import { electronAPI } from '@electron-toolkit/preload';

// Custom APIs for renderer
const api = {
  customWindowMinimize: (): void => {
    ipcRenderer.send('customWindowMinimize');
  },
  customWindowClose: (): void => {
    ipcRenderer.send('customWindowClose');
  },
  openUrl: (url: string) => {
    ipcRenderer.send('openUrl', url);
  },
  loadDefaultVideoPath: (): Promise<string> => {
    return ipcRenderer.invoke('loadDefaultVideoPath');
  },
  chooseFilePath: (
    defaultPath?: string
  ): Promise<Array<string> | undefined> => {
    return ipcRenderer.invoke('chooseFilePath', defaultPath);
  },
  loadDesktopCapturer: (): Promise<DesktopCapturerSource> => {
    return ipcRenderer.invoke('loadDesktopCapturer');
  },
  startRecording: (options: ISetting) => {
    ipcRenderer.send('startRecording', options);
  },
  recordingAnimationClose: () => {
    ipcRenderer.send('recordingAnimationClose');
  },
  recordingControlWindowMouseEnter: () => {
    ipcRenderer.send('recordingControlWindowMouseEnter');
  },
  recordingControlWindowMouseLeave: () => {
    ipcRenderer.send('recordingControlWindowMouseLeave');
  },
  recordingControlWindowClose: () => {
    ipcRenderer.send('recordingControlWindowClose');
  },
  recordingStatus: (callback: (message: string) => void): void => {
    ipcRenderer.on(
      'recordingStatus',
      (_event: IpcRendererEvent, message: string) => {
        callback(message);
      }
    );
  },
  stopRecording: (): void => {
    ipcRenderer.send('stopRecording');
  },
  recordingProgress: (callback: (data: IRecordingProgress) => void): void => {
    ipcRenderer.on(
      'recordingProgress',
      (_event: IpcRendererEvent, data: IRecordingProgress) => {
        callback(data);
      }
    );
  },
  deleteRecording: (params: IRecording): Promise<number> => {
    return ipcRenderer.invoke('deleteRecording', params);
  },
  updateRecording: (params: IRecording): Promise<number> => {
    return ipcRenderer.invoke('updateRecording', params);
  },
  recordingPage: (
    params: IRecording & { pageNumber: number; pageSize: number }
  ): Promise<IPage<IRecording>> => {
    return ipcRenderer.invoke('recordingPage', params);
  },
  darkModeToggle: (mode: 'light' | 'dark'): Promise<boolean> => {
    return ipcRenderer.invoke('dark-mode:toggle', mode);
  },
  darkModeStatus: (): Promise<boolean> => {
    return ipcRenderer.invoke('dark-mode:status');
  }
};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI);
    contextBridge.exposeInMainWorld('api', api);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI;
  // @ts-ignore (define in dts)
  window.api = api;
}
