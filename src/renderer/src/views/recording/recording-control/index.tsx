import {
  CloseOutlined,
  MinusOutlined,
  StopOutlined,
  VideoCameraOutlined
} from '@ant-design/icons';
import styles from './index.module.less';
import { useEffect, useState } from 'react';
import { IRecordingProgress } from '@renderer/model/recording';

const RecordingControl = () => {
  const [recordingStatus, setRecordingStatus] = useState<string>('1');
  const [recordingTime, setRecordingTime] = useState<string>('00:00:00');

  useEffect(() => {
    window.api.recordingStatus((message: string) => {
      setRecordingStatus(message);
    });
    window.api.recordingProgress((data: IRecordingProgress) => {
      console.log(111115555);
      if (
        data &&
        data?.timemark &&
        data?.timemark?.length > 0 &&
        data?.timemark !== '00:00:00:00'
      ) {
        setRecordingTime(data.timemark.substring(0, 8));
      }
    });
  }, []);

  return (
    <>
      <div className={styles['recording-control-container']}>
        <div className="flex gap-5 items-center">
          <div>1920×1080</div>
          <div>显示器1</div>
        </div>
        <div className="flex gap-3 items-center">
          <div className="flex items-center gap-3 mr-10">
            {recordingStatus === '2' ? (
              <>
                <div className="flex-shrink-0 items-center flex gap-2 text-base">
                  <VideoCameraOutlined className="animate-bounce text-red-600" />
                  <div>录制中</div>
                </div>
                <div>{recordingTime}</div>
                <div
                  className="flex-shrink-0 items-center flex gap-2 text-base p-1 cursor-pointer rounded-full bg-none hover:bg-gray-200 active:bg-gray-300"
                  onClick={() => window.api.stopRecording()}
                >
                  <StopOutlined />
                  <div>停止</div>
                </div>
              </>
            ) : (
              <div>已就绪</div>
            )}
          </div>
          <MinusOutlined
            className="p-1 cursor-pointer rounded-full bg-none hover:bg-gray-200 active:bg-gray-300"
            onClick={() => window.api.recordingControlWindowMinimize()}
          />
          <CloseOutlined
            className="p-1 cursor-pointer rounded-full bg-none hover:bg-gray-200 active:bg-gray-300"
            onClick={() => window.api.recordingControlWindowClose()}
          />
        </div>
      </div>
    </>
  );
};

export default RecordingControl;
