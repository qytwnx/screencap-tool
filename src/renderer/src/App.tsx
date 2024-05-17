import Aside from '@renderer/components/aside';
import Header from '@renderer/components/header';
import PageLoading from '@renderer/components/page-loading';
import { Suspense, memo } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppStore } from '@renderer/store';
import { ConfigProvider, theme } from 'antd';

function App(): JSX.Element {
  const [isdark] = useAppStore((state) => [state.isdark]);

  return (
    <>
      <div className="h-screen w-screen flex">
        <div className="flex-shrink-0">
          <Aside />
        </div>
        <div className="flex-1">
          <Header />
          <div className="p-3 w-full h-full">
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
        </div>
      </div>
    </>
  );
}

export default memo(App);
