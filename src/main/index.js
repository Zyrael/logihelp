import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import path from 'path';
import { PrismaClient } from '@prisma/client';
import { readFile, writeFile } from 'fs/promises';
// import { writeFile } from 'fs';

let mainWindow, prisma;
let dbPath = null;

const getPrisma = (path) =>
  new PrismaClient({
    datasources: {
      db: {
        url: `file:${path}`,
      },
    },
  });

const getDBFromUser = async () => {
  const response = await dialog.showOpenDialog({
    filters: [{ name: 'DataBase', extensions: ['db'] }],
    properties: ['openFile'],
  });
  // if (!response.canceled) {
  //   path = response.filePaths[0];
  //   await writeFile(
  //     path.join(__dirname, '../../userData.json'),
  //     JSON.stringify({
  //       dbPath: path,
  //     })
  //   );
  //   return path;
  // }
  return response.canceled ? null : response.filePaths[0];
};

readFile(path.join(__dirname, '../../userData.json'), { encoding: 'utf-8' })
  .then((data) => {
    const userData = JSON.parse(data);
    dbPath = userData?.dbPath;
  })
  .catch(async () => {
    await writeFile(path.join(__dirname, '../../userData.json'), '');
  })
  .finally(async () => {
    // if (!dbPath) {
    //   const response = await dialog.showOpenDialog({
    //     filters: [{ name: 'DataBase', extensions: ['db'] }],
    //     properties: ['openFile'],
    //   });
    //   if (!response.canceled) {
    //     dbPath = response.filePaths[0];
    //     await writeFile(
    //       path.join(__dirname, '../../userData.json'),
    //       JSON.stringify({
    //         dbPath,
    //       })
    //     );
    //   }
    // }

    prisma = getPrisma(dbPath);

    const sortingMethod = {
      asc: (supplierA, supplierB) => {
        const nameA = supplierA.name.toLowerCase();
        const nameB = supplierB.name.toLowerCase();
        if (nameA > nameB) return 1;
        if (nameA < nameB) return -1;
        return 0;
      },
      desc: (supplierA, supplierB) => {
        const nameA = supplierA.name.toLowerCase();
        const nameB = supplierB.name.toLowerCase();
        if (nameA > nameB) return -1;
        if (nameA < nameB) return 1;
        return 0;
      },
    };

    function createWindow() {
      mainWindow = new BrowserWindow({
        minHeight: 600,
        minWidth: 800,
        height: 720,
        width: 1280,
        autoHideMenuBar: true,
        webPreferences: {
          preload: path.join(__dirname, '../preload/index.js'),
        },
      });

      // Vite dev server URL
      mainWindow.loadURL('http://localhost:5173');
      mainWindow.webContents.openDevTools();
      mainWindow.on('closed', () => (mainWindow = null));
    }

    app.whenReady().then(() => {
      ipcMain.handle('getSuppliers', async (_, sort) =>
        (await prisma.supplier.findMany()).sort(sortingMethod[sort])
      );
      ipcMain.handle(
        'addSupplier',
        async (_, data) =>
          await prisma.supplier.create({
            data,
          })
      );
      ipcMain.handle(
        'updateSupplier',
        async (_, data) =>
          await prisma.supplier.update({
            where: { id: parseInt(data.id, 10) },
            data,
          })
      );
      ipcMain.handle(
        'deleteSupplier',
        async (_, data) =>
          await prisma.supplier.delete({
            where: {
              id: parseInt(data.id, 10),
            },
          })
      );

      ipcMain.handle('getDBUrl', () => dbPath);

      ipcMain.handle('setDBUrl', async () => {
        dbPath = await getDBFromUser();
        if (dbPath !== null) {
          prisma = getPrisma(dbPath);
          await writeFile(
            path.join(__dirname, '../../userData.json'),
            JSON.stringify({
              dbPath,
            })
          );
        }
      });

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
  });

// console.log(userData.hello);
// if (!userData.dbPath) {
//   userData.dbPath = dialog();
// }
