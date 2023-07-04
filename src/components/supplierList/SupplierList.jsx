import React, { useRef, useState, useContext } from "react";
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
import { SupplierElement } from "./supplierElement";
import { ServerContext } from "../../ServerContext";
import { useDebounce } from "../../hooks/debounce.hook";

export function SupplierList({ sidebarOpened, setSidebarOpened }) {
  const dispatch = useDispatch();

  const [sort, setSort] = useState("asc");
  const [searchValue, setSearchValue] = useState("");
  const [searchFocus, setSearchFocus] = useState(false);
  const [scrollOffset, setScrollOffset] = useState(0);

  const supplierListRef = useRef(null);

  const { getSuppliers } = useContext(ServerContext);

  const { loading, error, data } = getSuppliers({ sort });

  const suppliers = data?.getSuppliers;

  const handleChangeSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const debouncedSearch = useDebounce(handleChangeSearch);

  const { supplierTabOpened } = useSelector((state) => state.supplierTab);

  const showSuppliers = suppliers?.filter(
    (supplier) =>
      supplier.name.toLowerCase().includes(searchValue.trim().toLowerCase()) ||
      supplier.address?.toLowerCase().includes(searchValue.trim().toLowerCase())
  );

  const searchRef = useRef(null);

  const clearSearch = () => {
    setSearchValue("");
    searchRef.current.value = "";
  };

  const handleCreateSupplier = () => {
    dispatch(setMode("createSupplier"));
    dispatch(openSupplierTab());
  };

  const handleScroll = (e) => {
    setScrollOffset(e.target.scrollTop);
  };

  return (
    <div
      className={cn("supplier-list-container", {
        "supplier-list-container--active": !supplierTabOpened,
      })}
    >
      <div
        className={cn("supplier-list-header", {
          "supplier-list-header--shadow": scrollOffset > 0,
        })}
      >
        <div className="supplier-list-header-top">
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
              placeholder="Поиск"
              onChange={debouncedSearch}
              ref={searchRef}
              onFocus={() => setSearchFocus(true)}
              onBlur={() => setSearchFocus(false)}
            />
            <div className={cn("search-border", { active: searchFocus })} />
            {searchRef.current?.value !== "" && (
              <button
                type="button"
                className="clear-input"
                onClick={clearSearch}
              >
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
        <div className="supplier-list-header-bottom">
          <button
            type="button"
            className="sort-btn"
            onClick={() => setSort(sort === "asc" ? "desc" : "asc")}
          >
            {sort === "asc" ? "А-Я" : "Я-А"}
          </button>
        </div>
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
            // <ReactList
            //   length={showSuppliers.length}
            //   itemRenderer={renderSupplier}
            // />
          )}
        </div>
      )}
      <button
        type="button"
        className={cn("scroll-top-btn", {
          visible: scrollOffset > 300,
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
