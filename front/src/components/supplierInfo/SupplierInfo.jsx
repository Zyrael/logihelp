import React from "react";
import { useSelector } from "react-redux";

export function SupplierInfo() {
  const { name, url, additionalData } = useSelector(
    (state) => state.modal.currSupplier
  );

  return (
    <div className="supplier-info">
      <h3 className="supplier-name">{name}</h3>
      <a href={url} className="supplier-url">
        Сайт
      </a>
      <p className="addtionalData">{additionalData}</p>
    </div>
  );
}
