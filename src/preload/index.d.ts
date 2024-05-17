import { ElectronAPI } from '@electron-toolkit/preload';

declare global {
  interface Window {
    electron: ElectronAPI;
    api: {
      customWindowMinimize: () => void;
      customWindowClose: () => void;
      openUrl: (url: string) => void;
      chooseFilePath: (
        defaultPath?: string
      ) => Promise<Array<string> | undefined>;
      deleteSettingById: (data: ISetting) => Promise<number>;
      updateSettingById: (data: ISetting) => Promise<number>;
      selectOneSetting: (data: ISetting) => Promise<ISetting>;
    };
  }
}
