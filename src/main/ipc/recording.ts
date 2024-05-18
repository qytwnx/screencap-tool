import { ipcMain } from 'electron';
import { createWindow } from '../config';

export const registerRecording = (): void => {
  ipcMain.on('recordingStart', () => {
    const recordWin = createWindow();
  });
};
