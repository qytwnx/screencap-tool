import {
  CloseOutlined,
  GithubOutlined,
  MinusOutlined,
  MoonFilled,
  SunFilled
} from '@ant-design/icons';
import { useAppStore } from '@renderer/store';
import styles from './index.module.less';

const Header = () => {
  const [isdark, setIsdark] = useAppStore((state) => [
    state.isdark,
    state.setIsdark
  ]);

  return (
    <>
      <div className={styles['header-container']}>
        <div className={styles['header-container-move']}></div>
        <div className={styles['header-container-operate']}>
          <GithubOutlined
            className={[
              styles['header-container-operate-item'],
              styles['header-container-operate-item-icon']
            ].join(' ')}
            onClick={() => window.api.openUrl('https://github.com/qytwnx')}
          />
          <label className={styles['header-container-operate-item']}>
            <input
              type="checkbox"
              className="theme-controller"
              hidden={true}
              value={isdark ? 'dark' : 'light'}
              onChange={() => setIsdark(!isdark)}
            />
            {isdark ? (
              <SunFilled
                className={[
                  'theme-controller',
                  'fill-current',
                  styles['header-container-operate-item-icon']
                ].join(' ')}
              />
            ) : (
              <MoonFilled
                className={[
                  'theme-controller',
                  'fill-current',
                  styles['header-container-operate-item-icon']
                ].join(' ')}
              />
            )}
          </label>
          <div className="w-0.5 h-4 bg-gray-400" />
          <div className="flex-shrink-0 flex gap-2">
            <MinusOutlined
              className={[
                styles['header-container-operate-item'],
                styles['header-container-operate-item-icon']
              ].join(' ')}
              onClick={() => window.api.customWindowMinimize()}
            />
            <CloseOutlined
              className={[
                styles['header-container-operate-item'],
                styles['header-container-operate-item-icon']
              ].join(' ')}
              onClick={() => window.api.customWindowClose()}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
