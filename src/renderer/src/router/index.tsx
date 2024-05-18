import App from '@renderer/App';
import { lazy } from 'react';
import { createHashRouter } from 'react-router-dom';
import SettingLoader from '@renderer/views/setting/loader';
import SettingAction from '@renderer/views/setting/action';
import StartAnimation from '@renderer/views/recording/start-animation';

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
        loader: SettingLoader,
        action: SettingAction,
        Component: lazy(() => import('@renderer/views/setting'))
      }
    ]
  },
  {
    path: 'startAnimation',
    element: <StartAnimation />
  }
]);
export default router;
