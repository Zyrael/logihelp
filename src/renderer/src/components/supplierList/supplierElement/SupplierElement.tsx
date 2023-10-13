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
    <div className="flex flex-col px-2 border-b-[1px] border-gray-dark relative ml-3">
      <div className="flex min-h-[54px] items-center">
        <div>{supplier.name}</div>
        <button
          type="button"
          className="ml-auto min-w-[40px] min-h-[40px] hover:[&>*]:fill-primary flex items-center justify-center"
          onClick={(): void => setOpenedId(opened ? '' : supplier.id)}
        >
          <DropDownIcon
            className={cn('fill-gray-dark transition-all', {
              'rotate-180': opened
            })}
          />
        </button>
      </div>
      {opened ? (
        <div className="overflow-hidden pb-2 mt-[-10px]">
          <div>
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
              <div className="py-1 border-t-[1px] first-of-type:border-0">
                <p className="break-normal">
                  <span className="font-bold mr-1">Адрес:</span>
                  {supplier.address}
                </p>
              </div>
            ) : null}
            {supplier.contacts ? (
              <div className="py-1 border-t-[1px] first-of-type:border-0">
                <p className="break-normal">
                  <span className="font-bold mr-1">Контакты:</span>
                  {supplier.contacts}
                </p>
              </div>
            ) : null}
            {supplier.additionalData ? (
              <div className="py-1 border-t-[1px] first-of-type:border-0">
                <p className="break-normal">
                  <span className="font-bold mr-1">Примечание:</span>
                  {supplier.additionalData}
                </p>
              </div>
            ) : null}
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="text-red-500 hover:bg-gray-600/10 px-2 py-1 rounded-md transition-colors select-none"
            >
              Удалить
            </button>
            <button
              type="button"
              className="ml-1 text-primary hover:bg-gray-600/10 px-2 py-1 rounded-md transition-colors select-none"
            >
              Редактировать
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
