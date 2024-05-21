import {
  BrowserWindow,
  IpcMainInvokeEvent,
  app,
  dialog,
  ipcMain
} from 'electron';
import { resolve } from 'node:path';

export const registerFileOperate = (win: BrowserWindow): void => {
  ipcMain.handle('loadDefaultVideoPath', () => {
    return resolve(app.getPath('videos'), 'QVideo');
  });
  ipcMain.handle(
    'chooseFilePath',
    (_event: IpcMainInvokeEvent, defaultPath?: string) => {
      if (!defaultPath) {
        defaultPath = app.getPath('videos');
      }
      return dialog.showOpenDialogSync(win, {
        defaultPath: defaultPath,
        properties: ['openDirectory', 'createDirectory']
      });
    }
  );
};
