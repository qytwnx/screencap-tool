import { insert, del, update, selectOne } from './../database';
import { IpcMainInvokeEvent, ipcMain } from 'electron';

export const registerSqlOperate = () => {
  ipcMain.handle(
    'insertSetting',
    (_event: IpcMainInvokeEvent, params: ISetting) => {
      const { videoPath } = params;
      let insertStatement = 'INSERT INTO settings ';
      const columns: Array<string> = [];
      const values: Array<string> = [];
      const paramsMap: Record<string, any> = {};
      if (
        videoPath !== undefined &&
        videoPath !== null &&
        videoPath.length > 0
      ) {
        columns.push('videoPath');
        values.push('@videoPath');
        paramsMap['videoPath'] = videoPath;
      }

      insertStatement += '(' + columns.join(', ') + ') ';
      insertStatement += 'VALUES (' + values.join(', ') + ')';
      return insert(insertStatement, values);
    }
  );
  ipcMain.handle(
    'deleteSettingById',
    (_event: IpcMainInvokeEvent, params: ISetting) => {
      const { id } = params;
      if (!id) {
        return;
      }
      return del(`DELETE FROM setting WHERE id=@id`, params);
    }
  );
  ipcMain.handle(
    'updateSettingById',
    (_event: IpcMainInvokeEvent, params: ISetting) => {
      const { id, videoPath } = params;
      if (!id) {
        return;
      }
      const paramsMap: Record<string, any> = { id: id };
      const setValues: Array<string> = [];
      let updateStatement = 'UPDATE setting SET ';
      if (
        videoPath !== undefined &&
        videoPath !== null &&
        videoPath.length > 0
      ) {
        setValues.push('videoPath = @videoPath');
        paramsMap['videoPath'] = videoPath;
      }
      if (setValues.length <= 0) {
        return;
      }
      updateStatement += setValues.join(', ');
      updateStatement += ' WHERE id = @id';
      return update(updateStatement, paramsMap);
    }
  );
  ipcMain.handle(
    'selectOneSetting',
    (_event: IpcMainInvokeEvent, params: ISetting) => {
      return selectOne('SELECT * FROM setting LIMIT 1', params);
    }
  );
};
