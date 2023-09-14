import { ElectronAPI } from '@electron-toolkit/preload'

type dbAPI = {
  getDBUrl: GetDBUrl
  setDBUrl: SetDBUrl
}

type suppliersAPI = {
  getSuppliers: GetSuppliers
  addSupplier: AddSupplier
  updateSupplier: UpdateSupplier
  deleteSupplier: DeleteSupplier
}

declare global {
  interface Window {
    electron: ElectronAPI
    db: dbAPI
    suppliers: suppliersAPI
  }
}
