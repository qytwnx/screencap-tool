import { Setting, History, Monitor } from '@icon-park/react';
import LogoImage from '@renderer/assets/images/logo.svg';
import config from '../../../../../package.json';
import { useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import './index.less';

const Aside = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuList: Array<IMenuItem> = [
    {
      id: '1',
      key: '/recording',
      name: '录制',
      icon: <Monitor />
    },
    {
      id: '2',
      key: '/history',
      name: '记录',
      icon: <History />
    },
    {
      id: '3',
      key: '/setting',
      name: '设置',
      icon: <Setting />
    }
  ];

  return (
    <>
      <div className="aside-container">
        <div className="aside-container-logo">
          <img
            src={LogoImage}
            alt="logo"
            className="aside-container-logo-img"
          />
          <div className="aside-container-logo-title">录屏工具</div>
        </div>
        <div className="w-3/5 mx-auto border border-white"></div>
        <nav className="aside-container-menu">
          {menuList.map((item, index) => (
            <div
              // className={[
              //   'aside-container-menu-item',
              //   location.pathname === item.key ? 'active' : ''
              // ].join(' ')}
              className={classNames({
                'aside-container-menu-item': true,
                active: location.pathname === item.key
              })}
              key={index}
              onClick={() => navigate(item.key!, { replace: true })}
            >
              <div>{item?.icon}</div>
              <div>{item.name}</div>
            </div>
          ))}
        </nav>
        <div className="w-full flex flex-col items-center text-sm my-5 gap-1">
          <div>Design By QYT-WNX</div>
          <div>v{config.version}</div>
        </div>
      </div>
    </>
  );
};

export default Aside;
