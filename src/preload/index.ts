import { contextBridge, ipcRenderer } from 'electron';
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
  chooseFilePath: (
    defaultPath?: string
  ): Promise<Array<string> | undefined> => {
    return ipcRenderer.invoke('chooseFilePath', defaultPath);
  },
  deleteSettingById: (data: ISetting): Promise<number> => {
    return ipcRenderer.invoke('deleteSettingById', data);
  },
  updateSettingById: (data: ISetting): Promise<number> => {
    return ipcRenderer.invoke('updateSettingById', data);
  },
  selectOneSetting: (data: ISetting): Promise<ISetting> => {
    return ipcRenderer.invoke('selectOneSetting', data);
  },
  recordingStart: () => {
    ipcRenderer.send('recordingStart');
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
