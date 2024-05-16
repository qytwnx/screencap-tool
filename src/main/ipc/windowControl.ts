import { BrowserWindow, app, ipcMain } from 'electron';

export const registerWindowControl = (win: BrowserWindow): void => {
  ipcMain.on('customWindowMinimize', () => {
    win.minimize();
  });

  ipcMain.on('customWindowClose', () => {
    app.quit();
  });
};
