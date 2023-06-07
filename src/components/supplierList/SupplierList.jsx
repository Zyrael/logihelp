import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import cn from "classnames";
import { setMode, openSupplierTab } from "../supplierTab/supplierTabSlice";
import { ReactComponent as GlassSVG } from "../../assets/icons/glass.svg";
import { ReactComponent as XSVG } from "../../assets/icons/cross.svg";
import { ReactComponent as AddSVG } from "../../assets/icons/user-add.svg";
import { ReactComponent as HamburgerSVG } from "../../assets/icons/hamburger.svg";
import { Loading } from "../loading";
import "./SupplierList.css";
import { GET_SUPPLIERS } from "../../graphql";
import { SupplierElement } from "./supplierElement";

export function SupplierList({ sidebarOpened, setSidebarOpened }) {
  const { loading, error, data } = useQuery(GET_SUPPLIERS, {
    pollInterval: 10000,
  });

  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState("");
  const [showClear, setShowClear] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [searchFocus, setSearchFocus] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!loading && !error) setSuppliers(data.getSuppliers);
  }, [loading, error, data]);

  const showSuppliers = suppliers
    .filter((supplier) =>
      supplier.name.toLowerCase().includes(searchValue.trim().toLowerCase())
    )
    .sort((supplierA, supplierB) => {
      const nameA = supplierA.name.toLowerCase();
      const nameB = supplierB.name.toLowerCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });

  const handleChangeSearch = (e) => {
    setShowClear(e.currentTarget.value !== "");
    setSearchValue(e.currentTarget.value);
  };

  const { supplierTabOpened } = useSelector((state) => state.supplierTab);

  const searchRef = useRef(null);

  const clearSearch = () => {
    setSearchValue("");
    setShowClear(false);
  };

  useEffect(() => {
    if (supplierTabOpened) return;
    clearSearch();
  }, [supplierTabOpened]);

  const handleCreateSupplier = () => {
    dispatch(setMode("createSupplier"));
    dispatch(openSupplierTab());
  };

  const handleScroll = (e) => {
    setScrolled(e.currentTarget.scrollTop > 30);
  };

  return (
    <div
      className={cn("supplier-list-container", {
        "supplier-list-container--active": !supplierTabOpened,
      })}
    >
      <div
        className={cn("supplier-list-header", {
          "supplier-list-header--shadow": scrolled,
        })}
      >
        <button
          type="button"
          className="open-sidebar-btn"
          onClick={() => setSidebarOpened(!sidebarOpened)}
        >
          <HamburgerSVG className="hamburger-icon" />
        </button>
        <div className="search-container">
          <GlassSVG
            className={cn({
              glass: true,
              active: searchFocus,
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
            <button type="button" className="clear-input" onClick={clearSearch}>
              <XSVG className="clear-input-icon" />
            </button>
          )}
        </div>
        <button
          type="button"
          className="round-btn add"
          onClick={handleCreateSupplier}
          title="Добавить поставщика"
        >
          <AddSVG className="add-icon" />
        </button>
      </div>
      {loading && <Loading />}
      {error && (
        <div className="error">
          <span className="exclamation">&#x24D8;</span>&nbsp;Произошла ошибка.
        </div>
      )}
      {!loading && !error && (
        <div className="supplier-list-main" onScroll={handleScroll}>
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
