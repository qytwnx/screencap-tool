import { shell, BrowserWindow } from 'electron';
import { join } from 'path';
import url from 'node:url';
import { is } from '@electron-toolkit/utils';
import icon from '../../../resources/icon.png?asset';

export const createWindow = ({
  wdith = 750,
  height = 500,
  resizable = false,
  alwaysOnTop = false,
  maximizable = false,
  transparent = false,
  routerPath
}: {
  wdith?: number;
  height?: number;
  resizable?: boolean;
  alwaysOnTop?: boolean;
  maximizable?: boolean;
  transparent?: boolean;
  routerPath?: string;
}): BrowserWindow => {
  // Create the browser window.
  const win = new BrowserWindow({
    width: wdith,
    height: height,
    frame: false,
    show: false,
    resizable: resizable,
    alwaysOnTop: alwaysOnTop,
    autoHideMenuBar: true,
    maximizable: maximizable,
    transparent: transparent,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  });

  win.on('ready-to-show', () => {
    win.show();
  });

  win.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  routerPath = routerPath ? `#/${routerPath}` : '';

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    win.loadURL(process.env['ELECTRON_RENDERER_URL'] + routerPath);
  } else {
    // win.loadFile(join(__dirname, '../renderer/index.html'));
    win.loadURL(
      url.format({
        //编译后的文件
        pathname: join(__dirname, '../renderer/index.html'),
        //协议
        protocol: 'file',
        //protocol 后面需要两个/
        slashes: true,
        //hash 的值
        hash: routerPath
      })
    );
  }

  return win;
};
