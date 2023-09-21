import { ReactComponent as GlassIcon } from '@icons/glass.svg'
import { ReactComponent as PlusIcon } from '@icons/plus.svg'
import { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import _ from 'lodash'
import { setSearchValue } from '@renderer/app/appSlice'

export function Header(): React.ReactNode {
  const dispatch = useDispatch()

  const [inputValue, setInputValue] = useState('')

  const debounced = useCallback(
    _.debounce((value) => {
      dispatch(setSearchValue(value))
    }, 300),
    []
  )

  const handleInputChange = (e): void => {
    debounced(e.target.value)
    setInputValue(e.target.value)
  }

  return (
    <div className="px-3 h-[var(--header-height)] flex items-center">
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
      <button type="button" className="ml-3">
        <PlusIcon className="stroke-primary-light" />
      </button>
    </div>
  )
}
