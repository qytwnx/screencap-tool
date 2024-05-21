import Aside from '@renderer/components/aside';
import Header from '@renderer/components/header';
import PageLoading from '@renderer/components/page-loading';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <div className="h-full w-full flex">
        <div className="flex-shrink-0">
          <Aside />
        </div>
        <div className="flex-1 flex flex-col">
          <div className="flex-shrink-0">
            <Header />
          </div>
          <div className="p-3 w-full flex-1">
            <Suspense fallback={<PageLoading />}>
              <Outlet />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
