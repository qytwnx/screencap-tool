import { IpcMainInvokeEvent, ipcMain } from 'electron';
import { recordingOperate } from '../database';

export const registerSqlOperate = () => {
  const { deleteRecording, updateRecording, recordingPage } =
    recordingOperate();

  ipcMain.handle(
    'deleteRecording',
    (_event: IpcMainInvokeEvent, params: IRecording) => {
      return deleteRecording(params);
    }
  );

  ipcMain.handle(
    'updateRecording',
    (_event: IpcMainInvokeEvent, params: IRecording) => {
      return updateRecording(params);
    }
  );

  ipcMain.handle(
    'recordingPage',
    (
      _event: IpcMainInvokeEvent,
      params: IRecording & { pageNumber: number; pageSize: number }
    ) => {
      return recordingPage(params);
    }
  );
};
