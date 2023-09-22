import { ReactComponent as GlassIcon } from '@icons/glass.svg'
import { ReactComponent as PlusIcon } from '@icons/plus.svg'
import { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import _ from 'lodash'
import { setSearchValue } from '@renderer/app/appSlice'
import cn from 'classnames'

interface Props {
  setOpenedId: (openedId: string) => void
}

export function Header({ setOpenedId }: Props): React.ReactNode {
  const dispatch = useDispatch()
  const [opened, setOpened] = useState(false)

  const [inputValue, setInputValue] = useState('')

  const debounced = useCallback(
    _.debounce((value) => {
      dispatch(setSearchValue(value))
    }, 500),
    []
  )

  const [formData, setFormData] = useState({
    name: '',
    url: '',
    address: '',
    contacts: '',
    additionalData: ''
  })

  const handleInputChange = (e): void => {
    setOpenedId('')
    debounced(e.target.value)
    setInputValue(e.target.value)
  }

  return (
    <div className="px-4 h-[var(--header-height)] flex items-center relative">
      <div className="h-9 w-full relative">
        <GlassIcon className="absolute top-[10px] left-2" />
        <input
          type="text"
          name="search"
          id="search"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Поиск"
          className="bg-gray-neutral h-full w-full rounded-lg pl-8 placeholder:text-primary placeholder:font-light caret-primary outline-none"
        />
      </div>
      <button
        type="button"
        className="ml-3 z-[2000]"
        onClick={(): void => {
          if (!opened) {
            setOpenedId('')
          }
          setOpened(!opened)
          setTimeout(() => {
            setFormData({
              name: '',
              url: '',
              address: '',
              contacts: '',
              additionalData: ''
            })
          }, 300)
        }}
      >
        <PlusIcon
          className={cn('stroke-primary-light transition-all duration-200', {
            'rotate-45 scale-90 stroke-red-500': opened
          })}
        />
      </button>
      <div
        className={cn(
          'origin-top-right transition-all ease-dropdown duration-300 absolute top-2 right-2 left-2 z-[1000] bg-neutral-blue/10 backdrop-blur-xl shadow-md px-4 py-16 border-[1px] rounded-lg',
          {
            'scale-100 opacity-100': opened,
            'scale-0 opacity-10 select-none': !opened
          }
        )}
      >
        <div>
          <input
            type="text"
            name="name"
            value={formData.name}
            className="w-full"
            onChange={(e): void => setFormData({ ...formData, [e.target.name]: e.target.value })}
          />
          <input
            type="url"
            name="url"
            value={formData.url}
            className="w-full"
            onChange={(e): void => setFormData({ ...formData, [e.target.name]: e.target.value })}
          />
          <input
            type="text"
            name="address"
            value={formData.address}
            className="w-full"
            onChange={(e): void => setFormData({ ...formData, [e.target.name]: e.target.value })}
          />
          <input
            type="text"
            name="contacts"
            value={formData.contacts}
            className="w-full"
            onChange={(e): void => setFormData({ ...formData, [e.target.name]: e.target.value })}
          />
          <input
            type="text"
            name="additionalData"
            value={formData.additionalData}
            className="w-full"
            onChange={(e): void => setFormData({ ...formData, [e.target.name]: e.target.value })}
          />
        </div>
      </div>
    </div>
  )
}
