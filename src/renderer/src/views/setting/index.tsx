import { Button, Input, Select } from 'antd';
import styles from './index.module.less';
import { useAppStore } from '@renderer/store';
import { useEffect } from 'react';
import {
  FileFormatOptions,
  VideoResolutionOptions,
  VideoFrameRateOptions
} from '@renderer/constants/options';

const Setting = () => {
  const [setting, setSetting] = useAppStore((state) => [
    state.setting,
    state.setSetting
  ]);
  const handleChooseFilePath = async () => {
    const res = await window.api.chooseFilePath(setting?.videoPath);
    if (res !== undefined && res instanceof Array && res.length > 0) {
      const videoPath = String(res[0]);
      setSetting({ ...setting, videoPath: videoPath });
    }
  };

  const handleFileFormatChange = (value: string) => {
    setSetting({ ...setting, fileFormat: value });
  };

  const handleVideoResolutionChange = (value: string) => {
    setSetting({ ...setting, resolution: value });
  };

  const handleVideoFrameRateChange = (value: number) => {
    setSetting({ ...setting, frameRate: value });
  };

  useEffect(() => {
    if (!setting?.videoPath) {
      window.api.loadDefaultVideoPath().then((res) => {
        if (res) {
          setSetting({ ...setting, videoPath: res });
        }
      });
    }
  }, []);

  return (
    <>
      <main className={styles['setting-container']}>
        <section className={styles['setting-container-item']}>
          <div className={styles['setting-container-item-title']}>常规</div>
          <div className={styles['setting-container-item-content']}>
            <div className={styles['setting-container-item-content-item']}>
              <div
                className={styles['setting-container-item-content-item-label']}
              >
                存储位置：
              </div>
              <div
                className={
                  styles['setting-container-item-content-item-content']
                }
              >
                <Input
                  value={setting?.videoPath}
                  readOnly
                  placeholder="请选择位置"
                />
                <Button
                  onClick={() => {
                    handleChooseFilePath();
                  }}
                >
                  选择
                </Button>
              </div>
            </div>
            <div className={styles['setting-container-item-content-item']}>
              <div
                className={styles['setting-container-item-content-item-label']}
              >
                存储格式：
              </div>
              <div
                className={
                  styles['setting-container-item-content-item-content']
                }
              >
                <Select
                  value={setting?.fileFormat}
                  placeholder="请选择存储格式"
                  listHeight={130}
                  placement="bottomLeft"
                  className="w-full"
                  onChange={handleFileFormatChange}
                  options={FileFormatOptions}
                />
              </div>
            </div>
          </div>
        </section>
        <section className={styles['setting-container-item']}>
          <div className={styles['setting-container-item-title']}>录屏配置</div>
          <div className={styles['setting-container-item-content']}>
            <div className={styles['setting-container-item-content-item']}>
              <div
                className={styles['setting-container-item-content-item-label']}
              >
                画质：
              </div>
              <div
                className={
                  styles['setting-container-item-content-item-content']
                }
              >
                <Select
                  value={setting?.resolution}
                  listHeight={130}
                  placement="bottomLeft"
                  placeholder="请选择画质"
                  className="w-full"
                  onChange={handleVideoResolutionChange}
                  options={VideoResolutionOptions}
                />
              </div>
            </div>
            <div className={styles['setting-container-item-content-item']}>
              <div
                className={styles['setting-container-item-content-item-label']}
              >
                帧率：
              </div>
              <div
                className={
                  styles['setting-container-item-content-item-content']
                }
              >
                <Select
                  value={setting?.frameRate}
                  listHeight={130}
                  placement="bottomLeft"
                  placeholder="请选择帧率"
                  className="w-full"
                  onChange={handleVideoFrameRateChange}
                  options={VideoFrameRateOptions}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Setting;
