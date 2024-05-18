import {
  CaretDownOutlined,
  DesktopOutlined,
  ExpandOutlined,
  WindowsOutlined
} from '@ant-design/icons';
import styles from './index.module.less';

const Recording = () => {
  const handleStartRecording = () => {
    window.api.recordingStart();
  };

  return (
    <>
      <div className={styles['recording-container']}>
        <div className={styles['recording-container-info']}>
          <div>录制方式：全屏录制</div>
          <div>录制窗口：整个屏幕</div>
          <div></div>
        </div>
        <div className={styles['recording-container-operate']}>
          <div className={styles['recording-container-operate-option']}>
            <div className={styles['recording-container-operate-option-item']}>
              <DesktopOutlined />
              <div>全屏录制</div>
            </div>
            <div className={styles['recording-container-operate-option-item']}>
              <WindowsOutlined />
              <div>窗口录制</div>
              <CaretDownOutlined />
            </div>
            <div className={styles['recording-container-operate-option-item']}>
              <ExpandOutlined />
              <div>区域录制</div>
            </div>
          </div>
          <div className={styles['recording-container-operate-button']}>
            <div
              className={styles['recording-container-operate-button-start']}
              onClick={() => handleStartRecording()}
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
