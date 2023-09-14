export function useServer(): UseServer {
  const getSuppliers: GetSuppliers = async (sort = 'asc') => window.suppliers.getSuppliers(sort)
  const addSupplier: AddSupplier = async (data) => window.suppliers.addSupplier(data)
  const updateSupplier: UpdateSupplier = async (data) => window.suppliers.updateSupplier(data)
  const deleteSupplier: DeleteSupplier = async (data) => window.suppliers.deleteSupplier(data)
  const getDBUrl: GetDBUrl = async () => window.db.getDBUrl()
  const setDBUrl: SetDBUrl = async () => window.db.setDBUrl()

  return {
    getSuppliers,
    addSupplier,
    updateSupplier,
    deleteSupplier,
    getDBUrl,
    setDBUrl
  }
}
