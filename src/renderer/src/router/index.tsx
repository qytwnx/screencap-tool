import App from '@renderer/App';
import { lazy } from 'react';
import { createHashRouter } from 'react-router-dom';
import StartAnimation from '@renderer/views/recording/start-animation';
import RecordingControl from '@renderer/views/recording/recording-control';
import RegionSelect from '@renderer/views/recording/region-select';
import Home from '@renderer/layout/home';

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Home />,
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
      },
      {
        path: 'startAnimation',
        element: <StartAnimation />
      },
      {
        path: 'recordingControl',
        element: <RecordingControl />
      },
      {
        path: 'regionSelect',
        element: <RegionSelect />
      }
    ]
  }
]);
export default router;
