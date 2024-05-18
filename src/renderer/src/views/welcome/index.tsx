import { Tag } from 'antd';
import styles from './index.module.less';
import {
  BilibiliOutlined,
  GithubOutlined,
  QqOutlined,
  TikTokOutlined
} from '@ant-design/icons';

interface IReleaseItem {
  id?: string;
  time?: string;
  content?: string;
}

const Welcome = () => {
  const releaseList: Array<IReleaseItem> = [
    {
      id: '1',
      time: '2024-05-16',
      content: '初始化工程初始化工程'
    },
    { id: '2', time: '2024-05-17', content: '引入SQLite' }
  ];

  return (
    <>
      <div className={styles['welcome-container']}>
        <div className={styles['welcome-container-title']}>
          欢迎使用录屏工具
        </div>
        <div className={styles['welcome-container-tags']}>
          <Tag color="#108ee9">高清录制</Tag>
          <Tag color="#87d568">全屏录制</Tag>
          <Tag color="#f50f50">区域录制</Tag>
        </div>
        <div className={styles['welcome-container-release']}>
          {releaseList.map((item, index) => (
            <div
              className={styles['welcome-container-release-item']}
              key={index}
            >
              <div className={styles['welcome-container-release-item-time']}>
                {item?.time}
              </div>
              <div>-</div>
              <div className={styles['welcome-container-release-item-content']}>
                {item?.content}
              </div>
            </div>
          ))}
        </div>
        <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded">
          <nav>
            <div className="flex gap-4 text-3xl">
              <QqOutlined />
              <GithubOutlined />
              <BilibiliOutlined />
              <TikTokOutlined />
            </div>
          </nav>
          <aside>
            <p>Copyright © 2024 - All right reserved by QYT-WNX</p>
          </aside>
        </footer>
      </div>
    </>
  );
};

export default Welcome;
