import React, { useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import './SupplierInput.css'

interface Props {
  value: string
  label: string
  setValue: () => void
  onBlur: () => void
  error: boolean
}

export function Input({
  value,
  setValue,
  label = 'Введите текст',
  onBlur,
  error
}: Props): React.ReactNode {
  const [active, setActive] = useState(!!value)
  const [focused, setFocused] = useState(false)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  useEffect(() => {
    if (inputRef.current !== null)
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`
  }, [])

  return (
    <div className="supplier-input">
      <textarea
        name="supplier-input"
        className={cn('supplier-input-field', { error })}
        value={value}
        onChange={(): void => {
          if (inputRef.current !== null) {
            inputRef.current.style.height = ''
            inputRef.current.style.height = `${inputRef.current.scrollHeight}px`
          }
          setValue()
        }}
        ref={inputRef}
        onFocus={(): void => {
          setFocused(true)
          setActive(true)
        }}
        onBlur={(): void => {
          setFocused(false)
          setActive(!!value)
          onBlur()
        }}
        autoComplete="false"
      />
      <div className={cn('supplier-input-border', { focused, error })} />
      <label
        htmlFor="supplier-input"
        className={cn('supplier-input-label', { active, focused, error })}
      >
        {label}
      </label>
    </div>
  )
}
