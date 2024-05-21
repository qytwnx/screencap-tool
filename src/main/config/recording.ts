import ffmpegPath from '@ffmpeg-installer/ffmpeg';
import ffprobePath from '@ffprobe-installer/ffprobe';
import ffmpeg from 'fluent-ffmpeg';
import path from 'path';
import { renameSync } from 'fs';
import { ISetting } from '../../renderer/src/model/app';
import { IRecordingProgress } from '../../renderer/src/model/recording';
import { recordingOperate } from '../database';

export default class Recording {
  constructor(
    private options?: ISetting,
    private ffmpeg?: ffmpeg.FfmpegCommand
  ) {}

  init(options: ISetting) {
    this.options = options;
    this.ffmpeg = ffmpeg();
    ffmpeg.setFfmpegPath(ffmpegPath.path);
    ffmpeg.setFfprobePath(ffprobePath.path);
    return this;
  }

  private getSaveFilePath(fileName: string, fileFormat) {
    return path.join(this.options!.videoPath!, `${fileName}.${fileFormat}`);
  }

  private getSaveFileName() {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const milliseconds = date.getMilliseconds().toString().padStart(3, '0');
    return `${year}-${month}-${day}_${hours}-${minutes}-${seconds}-${milliseconds}`;
  }

  run({
    progressCollback
  }: {
    progressCollback: (data: IRecordingProgress) => void;
  }) {
    const { insertRecording } = recordingOperate();
    const fileName = this.getSaveFileName();
    const saveTempPath = this.getSaveFilePath(fileName, 'temp');
    const saveFinalPath = this.getSaveFilePath(
      fileName,
      this.options?.fileFormat || 'mp4'
    );
    const startTime = new Date();
    let duration = '00:00:00';
    this.ffmpeg!.input('desktop')
      .inputFormat('gdigrab')
      .videoCodec('libx264')
      .audioCodec('aac')
      .fps(this.options?.frameRate || 30)
      .size(this.options?.resolution || '1920x1080')
      .addOptions(['-pix_fmt yuv420p', '-crf 12'])
      .on('progress', (progress) => {
        const currentTime = new Date();
        const elapsed = currentTime.getTime() - startTime.getTime();
        const hours = Math.floor(elapsed / 3600000)
          .toString()
          .padStart(2, '0');
        const minutes = Math.floor((elapsed % 3600000) / 60000)
          .toString()
          .padStart(2, '0');
        const seconds = Math.floor((elapsed % 60000) / 1000)
          .toString()
          .padStart(2, '0');
        const milliseconds = (elapsed % 1000).toString().padStart(3, '0');
        duration = `${hours}:${minutes}:${seconds}:${milliseconds}`;
        console.error(duration);
        console.error(progress.timemark);
        progressCollback({ ...progress, timemark: duration });
      })
      .on('stderr', (stderrLine) => {
        console.log('recording Stderr output:', stderrLine);
      })
      .on('error', (err) => {
        console.error('recording Error during screen recording:', err);
      })
      .on('end', () => {
        console.log('recording Screen recording finished.');
        renameSync(saveTempPath, saveFinalPath);
        insertRecording({
          fileName: fileName,
          filePath: saveFinalPath,
          fileFormat: this.options?.fileFormat || 'mp4',
          duration: duration,
          resolution: this.options?.resolution || '1920x1080',
          frameRate: this.options?.frameRate || 30
        });
      })
      .outputFormat(this.options?.fileFormat || 'mp4')
      .save(saveTempPath);
  }

  stop(collback: () => void) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.ffmpeg!.ffmpegProc.stdin.write('q');
    collback();
  }
}
