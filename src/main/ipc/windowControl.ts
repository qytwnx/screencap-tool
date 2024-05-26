import {
  BrowserWindow,
  IpcMainInvokeEvent,
  app,
  ipcMain,
  nativeTheme
} from 'electron';

export const registerWindowControl = (win: BrowserWindow): void => {
  ipcMain.on('customWindowMinimize', () => {
    win.minimize();
  });

  ipcMain.on('customWindowClose', () => {
    app.quit();
  });
  ipcMain.handle(
    'dark-mode:toggle',
    (_event: IpcMainInvokeEvent, mode: 'light' | 'dark') => {
      nativeTheme.themeSource = mode;
      return nativeTheme.shouldUseDarkColors;
    }
  );
  ipcMain.handle('dark-mode:status', () => {
    const status = nativeTheme.shouldUseDarkColors;
    return status;
  });
};
