import '@renderer/assets/styles/main.less';
import ReactDOM from 'react-dom/client';
import zhCN from 'antd/locale/zh_CN';
import { ConfigProvider } from 'antd';
import router from '@renderer/router';
import { RouterProvider } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ConfigProvider locale={zhCN}>
    <RouterProvider router={router} />
  </ConfigProvider>
);
