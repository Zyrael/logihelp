import React, { useEffect, useRef, useState, useDeferredValue } from "react";
// import { useQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import cn from "classnames";
import { setMode, openSupplierTab } from "../supplierTab/supplierTabSlice";
import { ReactComponent as GlassSVG } from "../../assets/icons/glass.svg";
import { ReactComponent as XSVG } from "../../assets/icons/cross.svg";
import { ReactComponent as AddSVG } from "../../assets/icons/user-add.svg";
import { ReactComponent as HamburgerSVG } from "../../assets/icons/hamburger.svg";
import { ReactComponent as ArrowSVG } from "../../assets/icons/arrow-left.svg";
import { ReactComponent as InfoSVG } from "../../assets/icons/info-circle.svg";
import { Loading } from "../loading";
import "./SupplierList.css";
// import { GET_SUPPLIERS } from "../../graphql";
import { SupplierElement } from "./supplierElement";
import { useServer } from "../../hooks";

export function SupplierList({ sidebarOpened, setSidebarOpened }) {
  // const { loading, error, data } = useQuery(GET_SUPPLIERS, {
  //   pollInterval: 10000,
  // });

  const { getSuppliers } = useServer();

  const { loading, error, data } = getSuppliers();

  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState("");
  const [showClear, setShowClear] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [searchFocus, setSearchFocus] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  const supplierListRef = useRef(null);

  useEffect(() => {
    if (!loading && !error) {
      const unsorted = [...data.getSuppliers];
      setSuppliers(
        unsorted.sort((supplierA, supplierB) => {
          const nameA = supplierA.name.toLowerCase();
          const nameB = supplierB.name.toLowerCase();
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        })
      );
    }
  }, [loading, error, data]);

  const deferredSearchValue = useDeferredValue(searchValue);

  const handleChangeSearch = (e) => {
    setShowClear(e.target.value !== "");
    setSearchValue(e.target.value);
  };

  const { supplierTabOpened } = useSelector((state) => state.supplierTab);

  let showSuppliers = [...suppliers];

  if (deferredSearchValue !== "") {
    showSuppliers = suppliers.filter((supplier) =>
      supplier.name.toLowerCase().includes(searchValue.trim().toLowerCase())
    );
  }

  const searchRef = useRef(null);

  const clearSearch = () => {
    setSearchValue("");
    searchRef.current.value = "";
    setShowClear(false);
  };

  const handleCreateSupplier = () => {
    dispatch(setMode("createSupplier"));
    dispatch(openSupplierTab());
  };

  const handleScroll = (e) => {
    setScrolled(e.currentTarget.scrollTop > 0);
    setShowScrollToTop(e.currentTarget.scrollTop > 300);
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
          title={sidebarOpened ? "Закрыть меню" : "Открыть меню"}
        >
          {sidebarOpened ? (
            <ArrowSVG className="close-sidebar-icon" />
          ) : (
            <HamburgerSVG className="open-sidebar-icon" />
          )}
        </button>
        <div className="search-container">
          <GlassSVG
            className={cn({
              "glass-icon": true,
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
          <div className={cn("search-border", { active: searchFocus })} />
          {showClear && (
            <button type="button" className="clear-input" onClick={clearSearch}>
              <XSVG
                className={cn("clear-input-icon", {
                  active: searchFocus,
                })}
              />
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
        <div className="supplier-list-error">
          <InfoSVG className="supplier-list-error-icon" />
          Произошла ошибка.
        </div>
      )}
      {!loading && !error && (
        <div
          className="supplier-list-main"
          onScroll={handleScroll}
          ref={supplierListRef}
        >
          {showSuppliers.length !== 0 && (
            <ul className="supplier-list">
              {showSuppliers.map((supplier) => (
                <SupplierElement key={supplier.id} supplier={supplier} />
              ))}
            </ul>
          )}
        </div>
      )}
      <button
        type="button"
        className={cn("scroll-top-btn", {
          visible: showScrollToTop,
        })}
        onClick={() => {
          supplierListRef.current.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        <ArrowSVG className="scroll-top-icon" />
      </button>
    </div>
  );
}
