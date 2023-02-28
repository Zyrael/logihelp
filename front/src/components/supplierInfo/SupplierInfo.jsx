import React from "react";
import { useSelector } from "react-redux";

export function SupplierInfo() {
  const { name, url, address, contacts, additionalData } = useSelector(
    (state) => state.modal.content.supplier
  );

  return (
    <div className="supplier-info">
      <h3 className="supplier-name">{name}</h3>
      <a href={url} className="supplier-url">
        Сайт
      </a>
      <p className="address">{address}</p>
      <p className="contacts">{contacts}</p>
      <p className="addtionalData">{additionalData}</p>
    </div>
  );
}
