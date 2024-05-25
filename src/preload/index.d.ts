import { ElectronAPI } from '@electron-toolkit/preload';
import { IPage, ISetting } from '../renderer/src/model/app';

declare global {
  interface Window {
    electron: ElectronAPI;
    api: {
      customWindowMinimize: () => void;
      customWindowClose: () => void;
      openUrl: (url: string) => void;
      loadDefaultVideoPath: () => Promise<string>;
      chooseFilePath: (
        defaultPath?: string
      ) => Promise<Array<string> | undefined>;
      loadDesktopCapturer: () => Promise<Array<DesktopCapturerSource>>;
      startRecording: (options: ISetting) => void;
      recordingAnimationClose: () => void;
      recordingControlWindowMinimize: () => void;
      recordingControlWindowClose: () => void;
      recordingStatus: (callback: (message: string) => void) => void;
      stopRecording: () => void;
      recordingProgress: (callback: (data: IRecordingProgress) => void) => void;
      deleteRecording: (params: IRecording) => Promise<number>;
      updateRecording: (params: IRecording) => Promise<number>;
      recordingPage: (
        params: IRecording & { pageNumber: number; pageSize: number }
      ) => Promise<IPage<IRecording>>;
    };
  }
}
