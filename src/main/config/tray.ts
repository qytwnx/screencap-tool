import { Menu, shell, Tray } from 'electron';
import icon from '../../../resources/windowTray.png?asset';
const createTray = () => {
  const tray = new Tray(icon);
  const contextMenu = Menu.buildFromTemplate([
    { label: '退出程序', role: 'quit' },
    { type: 'separator' },
    {
      label: '问题反馈',
      click: () => shell.openExternal('https://github.com/qytwnx')
    }
  ]);
  tray.setToolTip('录屏工具');
  tray.setContextMenu(contextMenu);
};

export { createTray };
