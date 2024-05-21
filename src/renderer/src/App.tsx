import PageLoading from '@renderer/components/page-loading';
import { Suspense, memo } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppStore } from '@renderer/store';
import { ConfigProvider, theme } from 'antd';

function App(): JSX.Element {
  const [isdark] = useAppStore((state) => [state.isdark]);

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
