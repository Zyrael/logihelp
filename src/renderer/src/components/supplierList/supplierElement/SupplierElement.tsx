import { ReactComponent as DropDownIcon } from '@icons/dropdown.svg'
import { useEffect, useState } from 'react'
import cn from 'classnames'

interface Props {
  supplier: Supplier
  openedId: string
  setOpenedId: (id: string) => void
}

export function SupplierElement({ supplier, openedId, setOpenedId }: Props): React.ReactNode {
  const [opened, setOpened] = useState(false)

  useEffect(() => {
    setOpened(openedId === supplier.id)
  }, [openedId])

  return (
    <div className="flex flex-col px-2 min-h-[54px] border-b-[1px] border-gray-dark py-4 relative">
      <div className="flex">
        <div>{supplier.name}</div>
        <button
          type="button"
          className="ml-auto"
          onClick={(): void => setOpenedId(opened ? '' : supplier.id)}
        >
          <DropDownIcon
            className={cn('fill-gray-dark hover:fill-primary transition-all duration-200', {
              'rotate-180': opened
            })}
          />
        </button>
      </div>
      <div
        className={cn(
          'origin-top-right transition-all ease-dropdown duration-300 absolute top-[calc(100%-10px)] right-1 left-1 z-[1000] bg-neutral-blue/10 backdrop-blur-xl shadow-md px-4 py-2 border-[1px] rounded-lg',
          {
            'scale-100 opacity-100': opened,
            'scale-0 opacity-0 select-none': !opened
          }
        )}
      >
        {supplier.url ? (
          <div className="py-1">
            <a
              href={supplier.url}
              target="_blank"
              rel="noreferrer"
              className="text-blue-500 hover:underline"
            >
              {supplier.url}
            </a>
          </div>
        ) : null}
        {supplier.address ? (
          <div className="py-1">
            <p className="break-normal">
              <span className="font-bold mr-1">Адрес:</span>
              {supplier.address}
            </p>
          </div>
        ) : null}
        {supplier.contacts ? (
          <div className="py-1">
            <p className="break-normal">
              <span className="font-bold mr-1">Контакты:</span>
              {supplier.contacts}
            </p>
          </div>
        ) : null}
        {supplier.additionalData ? (
          <div className="py-1">
            <p className="break-normal">
              <span className="font-bold mr-1">Примечание:</span>
              {supplier.additionalData}
            </p>
          </div>
        ) : null}
        <div className="flex justify-end">
          <button
            type="button"
            className="text-red-500 hover:bg-slate-800/10 px-2 py-1 rounded-md transition-colors select-none"
          >
            Удалить
          </button>
          <button
            type="button"
            className="ml-1 text-primary hover:bg-slate-800/10 px-2 py-1 rounded-md transition-colors  select-none"
          >
            Редактировать
          </button>
        </div>
      </div>
    </div>
  )
}
