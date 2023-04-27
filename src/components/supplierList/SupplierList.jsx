import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import cn from "classnames";
import { setMode } from "../modal/modalslice";
import { ReactComponent as Glass } from "../../assets/icons/glass.svg";
import { ReactComponent as Times } from "../../assets/icons/times.svg";
import { Loading } from "../loading";
import "./SupplierList.css";
import { GET_SUPPLIERS } from "../../graphql";
import { SupplierElement } from "./supplierElement";

export function SupplierList() {
  const { loading, error, data } = useQuery(GET_SUPPLIERS);

  const [searchValue, setSearchValue] = useState("");
  const [showClear, setShowClear] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [searchFocus, setSearchFocus] = useState(false);

  useEffect(() => {
    if (!loading && !error) setSuppliers(data.getSuppliers);
  }, [loading, error, data]);

  const showSuppliers = suppliers.filter((supplier) =>
    supplier.name.toLowerCase().includes(searchValue.trim().toLowerCase())
  );

  const handleChangeSearch = (e) => {
    setShowClear(e.currentTarget.value !== "");
    setSearchValue(e.currentTarget.value);
  };

  const searchRef = useRef(null);
  useEffect(() => searchRef.current.focus(), [showClear]);

  const handleClearButton = () => {
    setSearchValue("");
    setShowClear(false);
  };

  const dispatch = useDispatch();
  const handleCreateSupplier = () => {
    dispatch(setMode({ mode: "create" }));
  };

  const opened = useSelector((state) => state.supplierInfo.opened);

  return (
    <div
      className={cn("supplier-list-container", {
        "supplier-list-container--active": !opened,
      })}
    >
      <div className="supplier-list-header">
        <div className="search-container">
          <Glass
            className={cn({
              glass: true,
              "glass--active": searchFocus,
            })}
          />
          <input
            id="search-bar"
            className="search-bar"
            type="text"
            value={searchValue}
            placeholder="Поиск"
            onChange={handleChangeSearch}
            ref={searchRef}
            onFocus={() => setSearchFocus(true)}
            onBlur={() => setSearchFocus(false)}
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
        </div>

        <button
          type="button"
          className="blue-btn add"
          onClick={handleCreateSupplier}
        >
          +
        </button>
      </div>
      {loading && <Loading />}
      {error && (
        <div className="error">
          <span className="exclamation">&#x24D8;</span>&nbsp;Произошла ошибка.
        </div>
      )}
      {!loading && !error && (
        <div className="supplier-list-main">
          {data.getSuppliers.length === 0 && (
            <div className="nothing-found">Добавьте первого поставщика</div>
          )}
          {data.getSuppliers.length !== 0 && showSuppliers.length === 0 && (
            <div className="nothing-found">Ничего не найдено</div>
          )}
          {showSuppliers.length !== 0 && (
            <ul className="supplier-list">
              {showSuppliers.map((supplier) => (
                <SupplierElement key={supplier.id} supplier={supplier} />
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
