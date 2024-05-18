import { BrowserWindow, ipcMain } from 'electron';
import { createWindow } from '../config';

export const registerRecording = (mainWindow: BrowserWindow): void => {
  ipcMain.on('recordingStart', () => {
    //   recordWin;
    createWindow({
      wdith: 500,
      height: 500,
      alwaysOnTop: false,
      transparent: true,
      routerPath: 'startAnimation'
    });
    mainWindow.minimize();
  });
};
