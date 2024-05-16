import App from '@renderer/App';
import { lazy } from 'react';
import { createHashRouter } from 'react-router-dom';

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        Component: lazy(() => import('@renderer/views/welcome'))
      },
      {
        path: 'recording',
        Component: lazy(() => import('@renderer/views/recording'))
      },
      {
        path: 'history',
        Component: lazy(() => import('@renderer/views/history'))
      },
      {
        path: 'setting',
        Component: lazy(() => import('@renderer/views/setting'))
      }
    ]
  }
]);
export default router;
