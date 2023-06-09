const { app, BrowserWindow, Menu, globalShortcut } = require('electron');

process.env.NODE_ENV = 'development';

const isDev = process.env.NODE_ENV !== 'production' ? true : false;
const isWindows = process.platform === 'win32' ? true : false;
const isMac = process.platform === 'darwin' ? true : false;

let mainWindow;
let aboutWindow;

const createMainWindow = () => {
  mainWindow = new BrowserWindow({
    title: 'ImageShrink',
    width: 500,
    height: 600,
    icon: './assets/icons/Icon_256x256.png',
    resizable: isDev ? true : false,
  });

  // mainWindow.loadURL(`file://${__dirname}/app/index.html`);
  mainWindow.loadFile('./app/index.html');
};

const createAboutWindow = () => {
  aboutWindow = new BrowserWindow({
    title: 'ImageShrink',
    width: 300,
    height: 300,
    icon: './assets/icons/Icon_256x256.png',
    resizable: false,
  });

  aboutWindow.loadFile('./app/about.html');
};

app.on('ready', () => {
  createMainWindow();

  const mainMenu = Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(mainMenu);

  // globalShortcut.register('CmdOrCtrl+R', () => mainWindow.reload());
  // globalShortcut.register(isWindows ? 'Ctrl+Shift+I' : 'Command+Alt+I', () =>
  //   mainWindow.toggleDevTools()
  // );

  mainWindow.on('ready', () => (mainWindow = null));
});

const menu = [
  ...(isMac
    ? [
        {
          label: app.name,
          submenu: [
            {
              label: 'About',
              click: createAboutWindow,
            },
          ],
        },
      ]
    : []),
  {
    role: 'fileMenu',
  },
  ...(isWindows
    ? [
        {
          label: 'Help',
          submenu: [
            {
              label: 'About',
              click: createAboutWindow,
            },
          ],
        },
      ]
    : []),
  ...(isDev
    ? [
        {
          label: 'Developer',
          submenu: [
            { role: 'reload' },
            { role: 'forcereload' },
            { type: 'separator' },
            { role: 'toggledevtools' },
          ],
        },
      ]
    : []),
];

app.on('window-all-closed', () => {
  if (!isMac) return app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) return createMainWindow();
});
