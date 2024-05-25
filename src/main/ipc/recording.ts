import {
  BrowserWindow,
  desktopCapturer,
  ipcMain,
  IpcMainEvent,
  Notification
} from 'electron';
import { createWindow, Recording } from '../config';

let recordingAnimationWin: BrowserWindow | null = null;
let recordingControlWin: BrowserWindow | null = null;
export const registerRecording = (mainWindow: BrowserWindow): void => {
  const recording = new Recording();
  ipcMain.handle('loadDesktopCapturer', async () => {
    return await desktopCapturer.getSources({
      types: ['window', 'screen']
    });
  });

  ipcMain.on('startRecording', (_event: IpcMainEvent, options: ISetting) => {
    recordingAnimationWin = createWindow({
      width: 500,
      height: 500,
      alwaysOnTop: true,
      transparent: true,
      routerPath: 'startAnimation'
    });
    recordingControlWin = createWindow({
      width: 750,
      height: 45,
      alwaysOnTop: true,
      transparent: false,
      y: 0,
      routerPath: 'recordingControl'
    });
    recordingControlWin?.setBounds({ y: 0 });
    mainWindow?.webContents?.send('recordingStatus', '1');
    if (recordingControlWin !== null) {
      recordingControlWin?.webContents?.send('recordingStatus', '1');
    }
    recording.init(options);
    mainWindow.minimize();
  });
  ipcMain.on('recordingAnimationClose', () => {
    if (recordingAnimationWin !== null) {
      recordingAnimationWin?.destroy();
      recordingAnimationWin = null;
      // recordingAnimationWin?.isDestroyed();
    }
    mainWindow?.webContents?.send('recordingStatus', '2');
    if (recordingControlWin !== null) {
      recordingControlWin?.webContents?.send('recordingStatus', '2');
      recording.run({
        progressCollback: (data: IRecordingProgress) => {
          if (recordingControlWin !== null) {
            recordingControlWin?.webContents?.send('recordingProgress', data);
          }
        }
      });
    }
  });
  ipcMain.on('recordingControlWindowMinimize', () => {
    if (recordingControlWin !== null) {
      recordingControlWin?.minimize();
    }
  });
  ipcMain.on('recordingControlWindowClose', () => {
    if (recordingControlWin !== null) {
      recordingControlWin?.destroy();
      recordingControlWin = null;
    }
  });
  ipcMain.on('stopRecording', () => {
    recording.stop(() => {
      if (recordingControlWin !== null) {
        recordingControlWin?.destroy();
        recordingControlWin = null;
      }
      const NOTIFICATION_TITLE = '录屏通知';
      const NOTIFICATION_BODY = '录屏已完成，点击查看录屏文件';
      new Notification({
        title: NOTIFICATION_TITLE,
        body: NOTIFICATION_BODY
      }).show();
      mainWindow.restore();
    });
  });
};
