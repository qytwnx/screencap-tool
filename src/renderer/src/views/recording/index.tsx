import {
  CaretDownOutlined,
  DesktopOutlined,
  ExpandOutlined,
  WindowsOutlined
} from '@ant-design/icons';
import styles from './index.module.less';
import { useEffect, useState } from 'react';
import { DesktopCapturerSource } from 'electron';
import { Dropdown, MenuProps, message } from 'antd';
import { RecordingModeEnum } from '@renderer/enums/enums';
import { useAppStore } from '@renderer/store';
import {
  VideoResolutionOptions,
  VideoFrameRateOptions
} from '@renderer/constants/options';

const Recording = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const setting = useAppStore((state) => state.setting);
  const [desktopCapturerSource, setDesktopCapturerSource] = useState<
    Array<DesktopCapturerSource>
  >([]);
  const [currentCapturerSource, setCurrentCapturerSource] = useState<
    Pick<DesktopCapturerSource, 'id' | 'name' | 'display_id'>
  >({
    id: 'full-screen',
    name: '整个屏幕',
    display_id: ''
  });
  const [recordingMode, setRecordingMode] =
    useState<keyof typeof RecordingModeEnum>('1');
  const recordingMessageKey = 'recordingMessage';

  const handleLoadDesktopCapturerSource = async () => {
    const res = await window.api.loadDesktopCapturer();
    console.log(res);
    setDesktopCapturerSource(res);
    if (res?.length > 0) {
      setCurrentCapturerSource(res[0]);
    }
  };

  const handleStartRecording = () => {
    window.api.startRecording(setting);
  };

  const handleRecordingWindowSelect: MenuProps['onClick'] = ({ key }) => {
    messageApi.open({
      key: recordingMessageKey,
      type: 'warning',
      content: '暂未实现',
      duration: 0.5
    });
    console.log(key);
    return;
    // setRecordingMode('2');
    // setCurrentCapturerSource(
    //   desktopCapturerSource.find((item) => item.id === key)
    // );
  };

  useEffect(() => {
    handleLoadDesktopCapturerSource();
  }, []);

  return (
    <>
      {contextHolder}
      <div className={styles['recording-container']}>
        <div className={styles['recording-container-info']}>
          <div className="w-full overflow-hidden flex">
            <div className="flex-1 overflow-hidden whitespace-nowrap text-ellipsis">
              录制方式：{RecordingModeEnum[recordingMode].text}
            </div>
            <div className="flex-1 overflow-hidden whitespace-nowrap text-ellipsis">
              画质：
              {
                VideoResolutionOptions.find(
                  (item) => item.value === setting?.resolution
                )?.label
              }
            </div>
          </div>
          <div className="w-full flex">
            <div className="flex-1 overflow-hidden whitespace-nowrap text-ellipsis">
              录制窗口：{currentCapturerSource?.name}
            </div>
            <div className="flex-1 overflow-hidden whitespace-nowrap text-ellipsis">
              帧率：
              {
                VideoFrameRateOptions.find(
                  (item) => item.value === setting?.frameRate
                )?.label
              }
            </div>
          </div>
        </div>
        <div className={styles['recording-container-operate']}>
          <div className={styles['recording-container-operate-option']}>
            <div
              className={[
                styles['recording-container-operate-option-item'],
                recordingMode === '1' ? styles['active'] : ''
              ].join(' ')}
              onClick={() => {
                setRecordingMode('1');
                setCurrentCapturerSource({
                  id: 'full-screen',
                  name: '整个屏幕',
                  display_id: ''
                });
              }}
            >
              <DesktopOutlined />
              <div>全屏录制</div>
            </div>
            <Dropdown
              menu={{
                items: desktopCapturerSource.map((item) => ({
                  key: item.id,
                  label: (
                    <div className="w-36 overflow-hidden whitespace-nowrap text-ellipsis">
                      {item.name}
                    </div>
                  )
                })),
                onClick: handleRecordingWindowSelect
              }}
              overlayClassName="h-36 border rounded shadow-xl overflow-x-hidden overflow-y-auto"
            >
              <div
                className={[
                  styles['recording-container-operate-option-item'],
                  recordingMode === '2' ? styles['active'] : ''
                ].join(' ')}
              >
                <WindowsOutlined />
                <div>窗口录制</div>
                <CaretDownOutlined />
              </div>
            </Dropdown>
            <div
              className={[
                styles['recording-container-operate-option-item'],
                recordingMode === '3' ? styles['active'] : ''
              ].join(' ')}
              onClick={() => {
                messageApi.open({
                  key: recordingMessageKey,
                  type: 'warning',
                  content: '暂未实现',
                  duration: 0.5
                });
                // setRecordingMode('3');
                // setCurrentCapturerSource({
                //   id: 'area',
                //   name: '自定义区域',
                //   display_id: ''
                // });
              }}
            >
              <ExpandOutlined />
              <div>区域录制</div>
            </div>
          </div>
          <div className={styles['recording-container-operate-button']}>
            <div
              className={styles['recording-container-operate-button-start']}
              onClick={() => {
                handleStartRecording();
              }}
            >
              开始
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Recording;
