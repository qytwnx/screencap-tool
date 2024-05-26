import {
  CloseOutlined,
  StopOutlined,
  VideoCameraOutlined
} from '@ant-design/icons';
import styles from './index.module.less';
import { useEffect, useState } from 'react';
import { useAppStore } from '@renderer/store';
import { VideoResolutionOptions } from '@renderer/constants/options';

const RecordingControl = () => {
  const setting = useAppStore((state) => state.setting);
  const [recordingStatus, setRecordingStatus] = useState<string>('1');
  const [recordingTime, setRecordingTime] = useState<string>('00:00:00');

  const handleMouseEnterTop = (event: { clientY: number }) => {
    console.log('handleMouseEnterTop: ', event.clientY, recordingStatus);

    if (event.clientY === 0 && recordingStatus === '2') {
      window.api.recordingControlWindowMouseEnter();
    }
  };

  const handleMouseLeave = () => {
    console.log('handleMouseLeave: ', recordingStatus);
    if (recordingStatus === '2') {
      window.api.recordingControlWindowMouseLeave();
    }
  };

  useEffect(() => {
    window.api.recordingStatus((message: string) => {
      setRecordingStatus(message);
    });
  }, []);
  useEffect(() => {
    window.api.recordingProgress((data: IRecordingProgress) => {
      if (
        data &&
        data?.timemark &&
        data?.timemark?.length > 0 &&
        data?.timemark !== '00:00:00:00'
      ) {
        setRecordingTime(data.timemark.substring(0, 8));
      }
    });
    window.addEventListener('mousemove', handleMouseEnterTop);
    return () => {
      window.removeEventListener('mousemove', handleMouseEnterTop);
    };
  }, [recordingStatus]);

  return (
    <>
      <div
        id="recording-control-container"
        className={styles['recording-control-container']}
        onMouseLeave={() => handleMouseLeave()}
      >
        <div className="flex gap-5 items-center">
          <div>
            {
              VideoResolutionOptions.find(
                (item) => item.value === setting?.resolution
              )?.label
            }
          </div>
          <div>{setting.frameRate}FPS</div>
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
          {/* <MinusOutlined
            className="p-1 cursor-pointer rounded-full bg-none hover:bg-gray-200 active:bg-gray-300"
            onClick={() => window.api.recordingControlWindowMinimize()}
          /> */}
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
