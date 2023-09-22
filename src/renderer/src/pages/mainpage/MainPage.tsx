import { ReactComponent as PlusIcon } from '@icons/plus.svg'
import { SupplierList } from '@renderer/components'

export function MainPage(): React.ReactNode {
  return (
    <div className="h-full flex bg-white w-full">
      <div className="h-full min-w-[400px] relative border-r-[1px] border-gray-dark">
        <SupplierList />
      </div>
      <div className="w-full">
        <div className="h-[var(--header-height)] flex items-center pl-8 pr-4 w-full">
          <div className="text-2xl font-light">Маршрутный лист</div>
          <button
            type="button"
            className="bg-neutral-blue w-[35px] h-[35px] rounded-lg flex justify-center items-center ml-auto"
          >
            <PlusIcon className="rotate-45 stroke-gray-neutral" />
          </button>
        </div>
      </div>
    </div>
  )
}
