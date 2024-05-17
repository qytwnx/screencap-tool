import { Button, Input } from 'antd';
import styles from './index.module.less';
import { Form, useLoaderData, useSubmit } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Setting = () => {
  const submit = useSubmit();
  const settingData = useLoaderData();
  const [data, setData] = useState<ISetting>();
  const handleChooseFilePath = async () => {
    const res = await window.api.chooseFilePath(data?.videoPath);
    if (res !== undefined && res instanceof Array && res.length > 0) {
      const videoPath = String(res[0]);
      // setData({ ...data, videoPath: videoPath });
      submit(
        { ...data, videoPath: videoPath },
        {
          method: 'PUT'
        }
      );
    }
  };

  useEffect(() => {
    setData(settingData as ISetting);
  }, [settingData]);

  return (
    <>
      <Form method="PUT">
        <main className={styles['setting-container']}>
          <section className={styles['setting-container-item']}>
            <div className={styles['setting-container-item-title']}>常规</div>
            <div className={styles['setting-container-item-content']}>
              <div className={styles['setting-container-item-content-item']}>
                <div
                  className={
                    styles['setting-container-item-content-item-label']
                  }
                >
                  存储位置：
                </div>
                <div
                  className={
                    styles['setting-container-item-content-item-content']
                  }
                >
                  <Input
                    value={data?.videoPath}
                    readOnly
                    placeholder="请选择位置"
                    onChange={(e) => {
                      console.log(e);
                    }}
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
            </div>
          </section>
        </main>
      </Form>
    </>
  );
};

export default Setting;
