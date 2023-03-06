import React from "react";
import { SupplierItem } from "./supplierItem";
import "./SupplierList.css";

export function SupplierList({ suppliers, searchValue }) {
  const showSuppliers = suppliers.filter((supplier) =>
    supplier.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="suppliers-list-container">
      {showSuppliers.length ? (
        <ul className="suppliers-list">
          {showSuppliers.map((supplier) => (
            <SupplierItem key={supplier.id} supplier={supplier} />
          ))}
        </ul>
      ) : (
        <div className="span-container">
          <span>Nothing here.</span>
        </div>
      )}
    </div>
  );
}
