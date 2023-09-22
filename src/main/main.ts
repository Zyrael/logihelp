import { app, shell, BrowserWindow, ipcMain, dialog } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { PrismaClient } from '@prisma/client'
import { readFileSync, writeFileSync } from 'fs'

let prisma: PrismaClient
let dbPath: string | null = null
const userDataFolder = is.dev
  ? join(__dirname, '../..')
  : join(process.env.APPDATA || '', '/logihelp')

const getPrisma = (path: string): PrismaClient =>
  new PrismaClient({
    datasources: {
      db: {
        url: `file:${path}`
      }
    }
  })

const sortingMethod = {
  asc: (supplierA, supplierB): number => {
    const nameA = supplierA.name.toLowerCase()
    const nameB = supplierB.name.toLowerCase()
    if (nameA > nameB) return 1
    if (nameA < nameB) return -1
    return 0
  },
  desc: (supplierA, supplierB): number => {
    const nameA = supplierA.name.toLowerCase()
    const nameB = supplierB.name.toLowerCase()
    if (nameA > nameB) return -1
    if (nameA < nameB) return 1
    return 0
  }
}

const getDBFromUser = async (): Promise<string | null> => {
  const response = await dialog.showOpenDialog({
    filters: [{ name: 'DataBase', extensions: ['db'] }],
    properties: ['openFile']
  })
  return response.canceled ? null : response.filePaths[0]
}

try {
  const data = readFileSync(join(userDataFolder, 'userData.json'), {
    encoding: 'utf-8'
  })
  const userData = JSON.parse(data)
  dbPath = userData?.dbPath
} catch (err) {
  writeFileSync(join(userDataFolder, 'userData.json'), '')
} finally {
  if (dbPath) {
    prisma = getPrisma(dbPath)
  }
  app.whenReady().then(() => {
    electronApp.setAppUserModelId('com.electron')

    app.on('browser-window-created', (_, window) => {
      optimizer.watchWindowShortcuts(window)
    })

    ipcMain.handle('getSuppliers', async (_, sort) =>
      (await prisma.supplier.findMany()).sort(sortingMethod[sort])
    )
    ipcMain.handle(
      'addSupplier',
      async (_, data) =>
        await prisma.supplier.create({
          data
        })
    )
    ipcMain.handle(
      'updateSupplier',
      async (_, data) =>
        await prisma.supplier.update({
          where: { id: parseInt(data.id, 10) },
          data
        })
    )
    ipcMain.handle(
      'deleteSupplier',
      async (_, data) =>
        await prisma.supplier.delete({
          where: {
            id: parseInt(data.id, 10)
          }
        })
    )

    ipcMain.handle('getDBUrl', () => dbPath)

    ipcMain.handle('setDBUrl', async () => {
      dbPath = await getDBFromUser()
      if (dbPath !== null) {
        prisma = getPrisma(dbPath)
        writeFileSync(
          join(process.env.APPDATA || '', '/logihelp/userData.json'),
          JSON.stringify({
            dbPath
          })
        )
      }
      return dbPath
    })

    createWindow()

    app.on('activate', function () {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
  })

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
}

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    minHeight: 600,
    minWidth: 800,
    height: 720,
    width: 1280,
    show: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: join(__dirname, '../preload/preload.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
    mainWindow.webContents.openDevTools()
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}
