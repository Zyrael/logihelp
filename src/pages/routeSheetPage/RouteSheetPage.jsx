import React, { useState } from "react";
import { SupplierList, RouteSheet, LeftMenu } from "../../components";
import "./RouteSheetPage.css";
import { SupplierTab } from "../../components/supplierTab";
import cn from "classnames";

export function RouteSheetPage({ logout }) {
  const [leftMenuOpened, setLeftMenuOpened] = useState(false);

  return (
    <div className="route-sheet-page">
      <LeftMenu
        leftMenuOpened={leftMenuOpened}
        setLeftMenuOpened={setLeftMenuOpened}
        logout={logout}
      />
      <div
        className={cn("content-container content-container--left", {
          "left-margin": leftMenuOpened,
        })}
      >
        <SupplierList
          leftMenuOpened={leftMenuOpened}
          setLeftMenuOpened={setLeftMenuOpened}
        />
        <SupplierTab />
      </div>
      <div className="content-container content-container--right">
        <RouteSheet />
      </div>
      <div className="logout-window">
        <div className="logout-button-container">
          <button type="button" className="logout" onClick={logout}>
            Выйти
          </button>
        </div>
        <div className="arrow-down" />
      </div>
    </div>
  );
}
