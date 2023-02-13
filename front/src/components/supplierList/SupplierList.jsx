import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useQuery } from "@apollo/client";
import { addRoute } from "../routeList/routeListSlice";
import { openModal, setContent } from "../modal/modalslice";
import "./SupplierList.css";
import { SupplierInfo } from "../supplierInfo/SupplierInfo";
import { GET_SUPPLIERS } from "../../graphql";

export function SupplierList() {
  const [searchValue, setSearchValue] = useState("");
  const { loading, error, data } = useQuery(GET_SUPPLIERS);
  const suppliers = data.getSuppliers;

  const showSuppliers = suppliers.filter((supplier) =>
    supplier.name.toLowerCase().includes(searchValue.toLowerCase())
  );
  const dispatch = useDispatch();
  const handleAddRoute = (supplier) => () => dispatch(addRoute(supplier));
  const handleSeeButton = (supplier) => (e) => {
    e.stopPropagation();
    setContent(<SupplierInfo supplier={supplier} />);
    openModal();
  };
  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>Error</div>}
      {!loading && !error && (
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
            onClick={openModal}
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
                    <button type="button" onClick={handleSeeButton(supplier)}>
                      See more
                    </button>
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
      )}
    </>
  );
}
