import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useQuery } from "@apollo/client";
import { GET_SUPPLIERS } from "../../graphql";
import { SupplierList } from "./supplierList";
import { setMode } from "../modal/modalslice";
import "./Suppliers.css";

export function Suppliers() {
  const [searchValue, setSearchValue] = useState("");
  const { loading, error, data } = useQuery(GET_SUPPLIERS);
  const dispatch = useDispatch();
  const handleCreateSupplier = () => {
    dispatch(setMode({ mode: "create" }));
  };

  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>Error</div>}
      {!loading && !error && (
        <div className="suppliers-container">
          <div className="top-row">
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
              className="blue-btn add"
              onClick={handleCreateSupplier}
            >
              <span>+</span>
            </button>
          </div>

          <SupplierList
            suppliers={data.getSuppliers}
            searchValue={searchValue}
          />
        </div>
      )}
    </>
  );
}
