import { BaseSql } from './base';
import { getCurrentTime } from '../../renderer/src/utils/common';
export default () => {
  const { insert, del, update, selectList, selectTotal } = BaseSql();
  const insertRecording = (params: IRecording): number => {
    const { fileName, filePath, fileFormat, duration, resolution, frameRate } =
      params;
    let insertStatement = 'INSERT INTO recordings ';
    const columns: Array<string> = [];
    const values: Array<string> = [];
    const paramsMap: Record<string, any> = {};
    if (fileName && fileName?.length > 0) {
      columns.push('fileName');
      values.push('@fileName');
      paramsMap['fileName'] = fileName;
    }
    if (filePath && filePath?.length > 0) {
      columns.push('filePath');
      values.push('@filePath');
      paramsMap['filePath'] = filePath;
    }
    if (fileFormat && fileFormat?.length > 0) {
      columns.push('fileFormat');
      values.push('@fileFormat');
      paramsMap['fileFormat'] = fileFormat;
    }
    if (duration && duration?.length > 0) {
      columns.push('duration');
      values.push('@duration');
      paramsMap['duration'] = duration;
    }
    if (resolution && resolution?.length > 0) {
      columns.push('resolution');
      values.push('@resolution');
      paramsMap['resolution'] = resolution;
    }
    if (frameRate) {
      columns.push('frameRate');
      values.push('@frameRate');
      paramsMap['frameRate'] = frameRate;
    }
    columns.push('createdTime');
    values.push('@createdTime');
    paramsMap['createdTime'] = getCurrentTime();
    insertStatement += '(' + columns.join(', ') + ') ';
    insertStatement += 'VALUES (' + values.join(', ') + ')';
    return insert(insertStatement, paramsMap) as number;
  };

  const deleteRecording = (params: IRecording): number | undefined => {
    const { id } = params;
    if (!id) {
      return;
    }
    return del(`DELETE FROM recordings WHERE id=@id`, params);
  };

  const updateRecording = (params: IRecording): number | undefined => {
    const { id, fileName } = params;
    if (!id) {
      return;
    }
    const paramsMap: Record<string, any> = { id: id };
    const setValues: Array<string> = [];
    let updateStatement = 'UPDATE recordings SET ';
    if (fileName !== undefined && fileName !== null && fileName.length > 0) {
      setValues.push('fileName = @fileName');
      paramsMap['fileName'] = fileName;
    }
    if (setValues.length <= 0) {
      return;
    }
    updateStatement += setValues.join(', ');
    updateStatement += ' WHERE id = @id';
    return update(updateStatement, paramsMap);
  };

  const recordingPage = (
    params: IRecording & { pageNumber: number; pageSize: number }
  ): IPage<IRecording> => {
    const { pageNumber, pageSize } = params;
    let current = 0;
    let size = 5;
    if (pageSize) {
      size = pageSize;
    }
    if (pageNumber) {
      current = (pageNumber - 1) * size;
    }
    const total = selectTotal(`SELECT COUNT(*) AS total FROM recordings`, {});
    const records = selectList(
      `SELECT * FROM recordings LIMIT @current, @size`,
      { current: current, size: size }
    );
    return {
      records: records as Array<IRecording>,
      pageNumber: pageNumber,
      pageSize: pageSize,
      total: total
    };
  };

  return {
    insertRecording,
    deleteRecording,
    updateRecording,
    recordingPage
  };
};
