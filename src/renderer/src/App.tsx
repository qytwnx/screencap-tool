import Aside from '@renderer/components/aside';
import Header from '@renderer/components/header';
import PageLoading from '@renderer/components/page-loading';
import { Suspense, memo } from 'react';
import { Outlet } from 'react-router-dom';
function App(): JSX.Element {
  return (
    <>
      <div className="h-screen w-screen flex">
        <div className="flex-shrink-0">
          <Aside />
        </div>
        <div className="flex-1">
          <Header />
          <div className="m-3 w-full h-full">
            <Suspense fallback={<PageLoading />}>
              <Outlet />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(App);
