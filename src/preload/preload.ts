import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('suppliers', {
  getSuppliers: (sort) => ipcRenderer.invoke('getSuppliers', sort),
  addSupplier: (data) => ipcRenderer.invoke('addSupplier', data),
  updateSupplier: (data) => ipcRenderer.invoke('updateSupplier', data),
  deleteSupplier: (data) => ipcRenderer.invoke('deleteSupplier', data)
})

contextBridge.exposeInMainWorld('db', {
  getDBUrl: () => ipcRenderer.invoke('getDBUrl'),
  setDBUrl: () => ipcRenderer.invoke('setDBUrl')
})
