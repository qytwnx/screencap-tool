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
              'fill-current',
              styles['header-container-operate-item']
            ].join(' ')}
            onClick={() => window.api.openUrl('https://github.com/qytwnx')}
          />
          {isdark ? (
            <SunFilled
              className={[
                'fill-current',
                styles['header-container-operate-item']
              ].join(' ')}
              onClick={() => setIsdark(false)}
            />
          ) : (
            <MoonFilled
              className={[
                'fill-current',
                styles['header-container-operate-item']
              ].join(' ')}
              onClick={() => setIsdark(true)}
            />
          )}
          <div className="w-0.5 h-4 bg-gray-400" />
          <div className="flex-shrink-0 flex gap-2">
            <MinusOutlined
              className={[
                'fill-current',
                styles['header-container-operate-item']
              ].join(' ')}
              onClick={() => window.api.customWindowMinimize()}
            />
            <CloseOutlined
              className={[
                'fill-current',
                styles['header-container-operate-item']
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
