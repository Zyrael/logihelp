import React, { useEffect, useRef, useState } from "react";
import cn from "classnames";
import "./SupplierInput.css";

export function SupplierInput({
  data,
  label = "Введите текст",
  onChange,
  onBlur,
  danger,
}) {
  const [active, setActive] = useState(!!data);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
  }, []);

  return (
    <div
      className={cn("supplier-input", { focused, danger })}
      onClick={() => {
        inputRef.current.focus();
        setFocused(true);
        setActive(true);
      }}
    >
      <textarea
        name="supplier-input"
        className="supplier-input-field"
        value={data}
        onChange={(e) => {
          inputRef.current.style.height = "";
          inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
          onChange(e);
        }}
        ref={inputRef}
        onBlur={() => {
          setFocused(false);
          setActive(!!data);
          onBlur();
        }}
        onFocus={() => {
          setFocused(true);
          setActive(true);
        }}
        autoComplete="false"
      />
      <label
        htmlFor="supplier-input"
        className={cn("supplier-input-label", { active, focused, danger })}
      >
        {label}
      </label>
    </div>
  );
}
