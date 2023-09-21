type Supplier = {
  id: string
  name: string
  url?: string
  address?: string
  contacts?: string
  additionalData?: string
}

type GetSuppliers = (sort: 'asc' | 'desc' = 'asc') => Promise<Supplier[]>
type AddSupplier = (data: Supplier) => Promise<void>
type UpdateSupplier = (data: Supplier) => Promise<void>
type DeleteSupplier = (data: Supplier) => Promise<void>
type GetDBUrl = () => Promise<string>
type SetDBUrl = () => Promise<string>

type UseServer = {
  getSuppliers: GetSuppliers
  addSupplier: AddSupplier
  updateSupplier: UpdateSupplier
  deleteSupplier: DeleteSupplier
  getDBUrl: GetDBUrl
  setDBUrl: SetDBUrl
}

declare module '*.svg' {
  import React = require('react')
  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  const src: string
  export default src
}
