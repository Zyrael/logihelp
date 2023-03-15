import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { useDispatch } from "react-redux";
import { SupplierList } from "./supplierList";
import { setMode } from "../modal/modalslice";
import { ReactComponent as Glass } from "../../assets/icons/glass.svg";
import { ReactComponent as Times } from "../../assets/icons/times.svg";
import { ReactComponent as Loading } from "../../assets/icons/loading.svg";
import "./Suppliers.css";
import { GET_SUPPLIERS } from "../../graphql";

export function Suppliers() {
  const { loading, error, data } = useQuery(GET_SUPPLIERS);

  const [searchValue, setSearchValue] = useState("");
  const [showClear, setShowClear] = useState(false);

  const handleChangeSearch = (e) => {
    setShowClear(e.currentTarget.value !== "");
    setSearchValue(e.currentTarget.value);
  };

  const handleClearButton = () => {
    setSearchValue("");
    setShowClear(false);
  };

  const dispatch = useDispatch();
  const handleCreateSupplier = () => {
    dispatch(setMode({ mode: "create" }));
  };

  return (
    <div className="suppliers-container">
      <div className="top-row">
        <Glass className="glass" />
        <input
          id="search-bar"
          className="search-bar"
          type="text"
          value={searchValue}
          placeholder="Поиск"
          onChange={handleChangeSearch}
        />
        {showClear && (
          <button
            type="button"
            className="clear-input"
            onClick={handleClearButton}
          >
            <Times className="clear-input-icon" />
          </button>
        )}
        <button
          type="button"
          className="blue-btn add"
          onClick={handleCreateSupplier}
        >
          +
        </button>
      </div>
      {loading && (
        <div className="loading">
          <Loading className="loading-icon" />
        </div>
      )}
      {error && (
        <div className="error">
          <span className="exclamation">&#x24D8;</span>&nbsp;Произошла ошибка.
        </div>
      )}
      {!loading && !error && (
        <SupplierList suppliers={data.getSuppliers} searchValue={searchValue} />
      )}
    </div>
  );
}
