import LogoImage from '@renderer/assets/images/logo.svg';
import config from '../../../../../package.json';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './index.module.less';
import {
  HistoryOutlined,
  SettingOutlined,
  VideoCameraAddOutlined
} from '@ant-design/icons';
import { IMenuItem } from '@renderer/model/app';

const Aside = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuList: Array<IMenuItem> = [
    {
      id: '1',
      key: '/recording',
      name: '录制',
      icon: <VideoCameraAddOutlined />
    },
    {
      id: '2',
      key: '/history',
      name: '记录',
      icon: <HistoryOutlined />
    },
    {
      id: '3',
      key: '/setting',
      name: '设置',
      icon: <SettingOutlined />
    }
  ];

  return (
    <>
      <div className={styles['aside-container']}>
        <div className={styles['aside-container-logo']}>
          <img
            src={LogoImage}
            alt="logo"
            className={styles['aside-container-logo-img']}
          />
          <div className={styles['aside-container-logo-title']}>录屏工具</div>
        </div>
        <div className="w-3/5 mx-auto border"></div>
        <nav className={styles['aside-container-menu']}>
          {menuList.map((item, index) => (
            <div
              // className={classNames({
              //   styles['aside-container-menu-item']: true,
              //   styles['active']: location.pathname === item.key
              // })}
              // className={[
              //   'aside-container-menu-item',
              //   location.pathname === item.key ? 'active' : ''
              // ].join(' ')}
              className={[
                styles['aside-container-menu-item'],
                location.pathname === item.key ? styles['active'] : ''
              ].join(' ')}
              key={index}
              onClick={() => navigate(item.key!, { replace: true })}
            >
              <div>{item?.icon}</div>
              <div>{item.name}</div>
            </div>
          ))}
        </nav>
        <div className="w-full flex flex-col items-center text-sm my-5 gap-1"></div>
        <footer className="w-full flex flex-col items-center gap-2">
          <p>Design By QYT-WNX</p>
          <p>v{config.version}</p>
        </footer>
      </div>
    </>
  );
};

export default Aside;
