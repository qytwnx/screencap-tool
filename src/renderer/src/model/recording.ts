export type IRecording = {
  // 主键
  id?: number;
  // 文件名
  fileName?: string;
  // 文件路径
  filePath?: string;
  // 文件类型
  fileFormat?: string;
  // 时长
  duration?: string;
  // 分辨率
  resolution?: string;
  // 帧率
  frameRate?: number;
  // 创建时间
  createdTime?: string;
  // 更新时间
  updatedTime?: string;
};

export type IRecordingProgress = {
  frames?: number;
  currentFps?: number;
  currentKbps?: number;
  targetSize?: number;
  timemark?: string;
};
