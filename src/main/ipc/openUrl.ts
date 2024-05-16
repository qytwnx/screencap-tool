import { IpcMainInvokeEvent, ipcMain, shell } from 'electron';

export const registerOpenUrl = (): void => {
  ipcMain.on('openUrl', (_event: IpcMainInvokeEvent, url: string) => {
    shell.openExternal(url);
  });
};
