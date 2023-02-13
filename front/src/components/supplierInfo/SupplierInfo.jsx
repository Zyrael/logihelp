import React from "react";

export function SupplierInfo({ supplier }) {
  const { name, url, additionalData } = supplier;

  return (
    <div className="supplier-info">
      <h3 className="supplier-name">{name}</h3>
      <p className="supplier-url">{url}</p>
      <p className="addtionalData">{additionalData}</p>
    </div>
  );
}
