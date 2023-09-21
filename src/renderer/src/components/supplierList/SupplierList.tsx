import { useSelector } from 'react-redux'
import { RootState } from '@renderer/store'
import { SupplierElement } from './supplierElement'
import { useState } from 'react'
import { Header } from './header'

export function SupplierList(): React.ReactNode {
  const { suppliers, searchValue } = useSelector((state: RootState) => state.app)

  const [openedId, setOpenedId] = useState('')

  const showSuppliers: React.ReactNode[] = suppliers
    .filter((supplier) => supplier.name.toLowerCase().includes(searchValue.toLowerCase()))
    .map((supplier) => (
      <SupplierElement
        key={supplier.id}
        supplier={supplier}
        openedId={openedId}
        setOpenedId={setOpenedId}
      />
    ))

  return (
    <div>
      <Header />
      <div className="px-2 pb-4 absolute bottom-0 top-[var(--header-height)] left-0 right-0">
        <div
          className="h-full flex overflow-auto overflow-x-hidden w-full"
          onScroll={(): void => setOpenedId('')}
        >
          <div className="w-full">{showSuppliers}</div>
        </div>
      </div>
    </div>
  )
}
