import { ReactComponent as GlassIcon } from '@icons/glass.svg'
import { ReactComponent as PlusIcon } from '@icons/plus.svg'
import { ReactComponent as DropDownIcon } from '@icons/dropdown.svg'

export function MainPage(): React.ReactNode {
  const elements: React.ReactNode[] = []
  for (let i = 0; i < 50; i++) {
    elements.push(
      <div key={i} className="flex items-center px-2 h-[60px] border-b-[1px] border-gray-dark">
        <div>МосЭлектроСас</div>
        <button type="button" className="ml-auto">
          <DropDownIcon className="fill-gray-dark hover:fill-primary transition-colors" />
        </button>
      </div>
    )
  }

  return (
    <div className="h-full flex">
      <div className="h-full w-[500px] relative border-r-[1px] border-gray-dark">
        <div className="px-3 h-[var(--header-height)] flex items-center">
          <div className="h-9 w-full relative">
            <GlassIcon className="absolute top-[10px] left-2" />
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Поиск"
              className="bg-gray-neutral h-full w-full rounded-lg pl-8 text-primary placeholder:text-primary placeholder:font-light caret-primary outline-none"
            />
          </div>
          <button type="button" className="ml-3">
            <PlusIcon className="stroke-primary-light" />
          </button>
        </div>
        <div className="px-2 pb-4 absolute bottom-0 top-[var(--header-height)] left-0 right-0">
          <div className="h-full flex overflow-auto w-full">
            <div className="w-full">{elements}</div>
          </div>
        </div>
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
