import React, { useEffect, useRef, useState } from "react";
import cn from "classnames";
import "./SupplierInput.css";

export function SupplierInput({
  data,
  label = "Введите текст",
  onChange,
  onBlur,
  error,
}) {
  const [active, setActive] = useState(!!data);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
  }, []);

  return (
    <div className="supplier-input">
      <textarea
        name="supplier-input"
        className={cn("supplier-input-field", { error })}
        value={data}
        onChange={(e) => {
          inputRef.current.style.height = "";
          inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
          onChange(e);
        }}
        ref={inputRef}
        onFocus={() => {
          setFocused(true);
          setActive(true);
        }}
        onBlur={() => {
          setFocused(false);
          setActive(!!data);
          onBlur();
        }}
        autoComplete="false"
      />
      <div className={cn("supplier-input-border", { focused, error })} />
      <label
        htmlFor="supplier-input"
        className={cn("supplier-input-label", { active, focused, error })}
      >
        {label}
      </label>
    </div>
  );
}
