import { ReactComponent as Glass } from '@icons/glass.svg'
import { ReactComponent as Plus } from '@icons/plus.svg'
import { ReactComponent as DropDownIcon } from '@icons/dropdown.svg'

export function MainPage(): React.ReactNode {
  const elements: React.ReactNode[] = []
  for (let i = 0; i < 50; i++) {
    elements.push(
      <div key={i} className="flex items-center px-2 h-16 border-t-2 first-of-type:border-none">
        <div>МосЭлектроСас</div>
        <button type="button" className="ml-auto">
          <DropDownIcon className="fill-gray-dark hover:fill-primary transition-colors" />
        </button>
      </div>
    )
  }

  return (
    <div className="h-full relative">
      <div className="px-2 py-4 flex">
        <div className="h-9 w-full relative">
          <Glass className="absolute top-[10px] left-2" />
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Поиск"
            className="bg-gray-neutral h-full w-full rounded-md pl-8 text-primary placeholder:text-primary placeholder:font-light caret-primary outline-none"
          />
        </div>
        <button type="button" className="ml-3">
          <Plus />
        </button>
      </div>
      <div className="px-2 pb-4 absolute bottom-0 top-[68px] left-0 right-0">
        <div className="h-full flex overflow-auto w-full">
          <div className="w-full">{elements}</div>
        </div>
      </div>
    </div>
  )
}
