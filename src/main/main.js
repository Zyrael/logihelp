import { app, BrowserWindow } from 'electron';
import path from 'path';

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    minHeight: 600,
    minWidth: 800,
    height: 720,
    width: 1280,
    autoHideMenuBar: true,
    // webPreferences: {
    //   preload: path.join(__dirname, 'preload.js'),
    // },
  });

  // Vite dev server URL
  mainWindow.loadURL('http://localhost:5173');
  mainWindow.webContents.openDevTools();
  mainWindow.on('closed', () => (mainWindow = null));
}

app.whenReady().then(() => {
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow == null) {
    createWindow();
  }
});
