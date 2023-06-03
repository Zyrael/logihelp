import React from "react";

export function SupplierInput({ data, label = "Введите текст", onChange }) {
  return (
    <div className="supplier-input">
      <div
        id="supplier-input"
        className="supplier-input-field"
        contentEditable="true"
        onInput={(e) => onChange(e.currentTarget.innerText)}
        suppressContentEditableWarning
      >
        {data}
      </div>
      <label htmlFor="supplier-input">{label}</label>
    </div>
  );
}
