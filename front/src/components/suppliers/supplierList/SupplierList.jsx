import React from "react";
import { SupplierItem } from "./supplierItem";
import "./SupplierList.css";

export function SupplierList({ suppliers, searchValue }) {
  const showSuppliers = suppliers.filter((supplier) =>
    supplier.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="suppliers-list-container">
      {suppliers.length === 0 && (
        <div className="nothing-found">Добавьте первого поставщика</div>
      )}
      {suppliers.length !== 0 && showSuppliers.length === 0 && (
        <div className="nothing-found">Ничего не найдено</div>
      )}
      {showSuppliers.length !== 0 && (
        <ul className="suppliers-list">
          {showSuppliers.map((supplier) => (
            <SupplierItem key={supplier.id} supplier={supplier} />
          ))}
        </ul>
      )}
    </div>
  );
}
