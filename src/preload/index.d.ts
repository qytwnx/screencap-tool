import { ElectronAPI } from '@electron-toolkit/preload';

declare global {
  interface Window {
    electron: ElectronAPI;
    api: {
      customWindowMinimize: () => void;
      customWindowClose: () => void;
      openUrl: (url: string) => void;
    };
  }
}
