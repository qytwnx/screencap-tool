import { ipcMain } from 'electron';

export const registerRecording = (): void => {
  ipcMain.on('recordingStart', () => {
    console.log(66666);
  });
};
