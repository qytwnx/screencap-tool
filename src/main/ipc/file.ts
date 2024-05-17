import {
  BrowserWindow,
  IpcMainInvokeEvent,
  app,
  dialog,
  ipcMain
} from 'electron';

export const registerFileOperate = (win: BrowserWindow): void => {
  ipcMain.handle(
    'chooseFilePath',
    (_event: IpcMainInvokeEvent, defaultPath?: string) => {
      if (!defaultPath) {
        defaultPath = app.getPath('videos');
      }
      return dialog.showOpenDialogSync(win, {
        defaultPath: defaultPath,
        properties: ['openDirectory']
      });
    }
  );
};
