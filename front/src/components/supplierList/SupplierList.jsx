import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addRoute } from "../routeList/routeListSlice";
import "./SupplierList.css";

export function SupplierList({ suppliers, handleEnableEditing }) {
  const [searchValue, setSearchValue] = useState("");
  const showSuppliers = suppliers.filter((supplier) =>
    supplier.name.toLowerCase().includes(searchValue.toLowerCase())
  );
  const dispatch = useDispatch();
  const handleAddRoute = (supplier) => () => dispatch(addRoute(supplier));
  return (
    <div className="suppliers-container">
      <input
        id="search-bar"
        className="search-bar"
        type="text"
        value={searchValue}
        placeholder="Введите название..."
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <button
        type="button"
        className="add-supplier-btn"
        onClick={handleEnableEditing}
      >
        +
      </button>
      <div className="suppliers-list-container">
        {showSuppliers.length ? (
          <ul className="suppliers-list">
            {showSuppliers.map((supplier) => (
              <li
                key={supplier.id}
                tabIndex={0}
                onClick={handleAddRoute(supplier)}
              >
                {supplier.name}
              </li>
            ))}
          </ul>
        ) : (
          <div className="span-container">
            <span>Nothing here.</span>
          </div>
        )}
      </div>
    </div>
  );
}
