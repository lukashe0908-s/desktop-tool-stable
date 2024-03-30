import path from 'path';
import { app, ipcMain, screen } from 'electron';
import serve from 'electron-serve';
import { createWindow } from './helpers';
import { BrowserWindow } from 'electron';
import Store from 'electron-store';

const isProd = process.env.NODE_ENV === 'production';

const store = new Store();

if (isProd) {
  serve({ directory: 'app' });
} else {
  // app.setPath('userData', `${app.getPath('userData')} (development)`)
  app.setPath('userData', path.join(process.cwd(), '.data'));
}

let mainWindow_g: BrowserWindow;
let settingsWindow_g: BrowserWindow;
(async () => {
  await app.whenReady();
  let winWidth = (() => {
    let base = screen.getPrimaryDisplay().size.width * 0.13;
    if (base < 200) base = 200;
    base = Math.floor(base);
    // console.log('width', base);
    return base;
  })();
  let winHeight = (() => {
    let base = screen.getPrimaryDisplay().workArea.height * 1;
    base = Math.floor(base);
    // console.log('height', base);
    return base;
  })();

  const mainWindow = new BrowserWindow({
    // width: 1000,
    // height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
    backgroundMaterial: 'acrylic',
    transparent: true,
    frame: false,
    width: winWidth,
    height: winHeight,
    x: screen.getPrimaryDisplay().workArea.width - winWidth,
    y: 0,
    skipTaskbar: true,
  });
  mainWindow.setMenu(null);
  mainWindow.on('close', () => {
    mainWindow_g = undefined;
  });
  mainWindow_g = mainWindow;
  resizeWindow();
  ipcMain.on('set-config', async (event, ...arg) => {
    resizeWindow();
  });
  function resizeWindow() {
    const widthP = store.get('display.windowWidth');
    if (widthP) {
      winWidth = (() => {
        let base = screen.getPrimaryDisplay().size.width * Number(widthP);
        if (base < 200) base = 200;
        base = Math.floor(base);
        // console.log('width', base);
        return base;
      })();
      mainWindow.setSize(winWidth, winHeight);
      mainWindow.setPosition(screen.getPrimaryDisplay().workArea.width - winWidth, 0);
    }
  }

  if (isProd) {
    await mainWindow.loadURL('app://./float');
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    // mainWindow.webContents.openDevTools()
  }
  ipcMain.on('close-window', async (event, arg) => {
    mainWindow.close();
  });
})();

app.on('window-all-closed', () => {
  app.quit();
});

ipcMain.on('message', async (event, arg) => {
  event.reply('message', `${arg} World!`);
});
ipcMain.on('get-config', async (event, ...arg) => {
  event.reply('get-config/' + arg[0], store.get(arg[0]));
});
ipcMain.on('set-config', async (event, ...arg) => {
  store.set(arg[0], arg[1]);
  mainWindow_g.webContents.send('sync-config');
});

ipcMain.on('sys-shutdown', async (event, arg) => {
  const cp = require('child_process');
  // cp.execSync('slidetoshutdown');
  cp.execSync('shutdown -s -t 0');
});

ipcMain.on('settings-window', async (event, arg) => {
  if (settingsWindow_g) {
    settingsWindow_g.show();
    return;
  }
  const settingsWindow = new BrowserWindow({
    width: 1400,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
    maximizable: true,
    // backgroundMaterial: 'acrylic',
    // transparent: true,
    resizable: true,
  });
  settingsWindow.setMenu(null);
  settingsWindow.on('close', () => {
    settingsWindow_g = undefined;
  });
  settingsWindow_g = settingsWindow;

  arg && arg[0] && settingsWindow.webContents.openDevTools();

  if (isProd) {
    await settingsWindow.loadURL('app://./settings');
  } else {
    const port = process.argv[2];
    await settingsWindow.loadURL(`http://localhost:${port}/settings`);
  }
});
ipcMain.on('ai-window', async (event, arg) => {
  const window = new BrowserWindow({
    width: 1400,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
    maximizable: true,
    // backgroundMaterial: 'acrylic',
    // transparent: true,
    resizable: true,
  });
  window.setMenu(null);

  if (isProd) {
    await window.loadURL('app://./ai');
  } else {
    const port = process.argv[2];
    await window.loadURL(`http://localhost:${port}/ai`);
  }
});
