import PageLoading from '@renderer/components/page-loading';
import { Suspense, memo, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppStore } from '@renderer/store';
import { ConfigProvider, theme } from 'antd';

function App(): JSX.Element {
  const [isdark, setIsdark] = useAppStore((state) => [
    state.isdark,
    state.setIsdark
  ]);

  const handleLoadDarkModeStatus = async () => {
    if (isdark !== undefined) {
      window.api.darkModeToggle(isdark ? 'dark' : 'light');
      return;
    }
    const status = await window.api.darkModeStatus();
    setIsdark(status);
  };

  useEffect(() => {
    handleLoadDarkModeStatus();
  }, []);

  return (
    <>
      <div className="h-screen w-screen">
        <ConfigProvider
          theme={{
            algorithm: isdark ? theme.darkAlgorithm : theme.defaultAlgorithm
          }}
        >
          <Suspense fallback={<PageLoading />}>
            <Outlet />
          </Suspense>
        </ConfigProvider>
      </div>
    </>
  );
}

export default memo(App);
