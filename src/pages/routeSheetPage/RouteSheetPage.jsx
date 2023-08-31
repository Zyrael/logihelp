import React, { useState } from "react";
import cn from "classnames";
import { SupplierList, RouteSheet, Sidebar } from "../../components";
import { SupplierTab } from "../../components/supplierTab";
import "./RouteSheetPage.sass";
// import { useServer } from "../../hooks";

export function RouteSheetPage({ logout }) {
  const [sidebarOpened, setSidebarOpened] = useState(false);

  return (
    <div className="route-sheet-page">
      <Sidebar
        sidebarOpened={sidebarOpened}
        setSidebarOpened={setSidebarOpened}
        logout={logout}
      />
      <div
        className={cn("content-container content-container--left", {
          "left-margin": sidebarOpened,
        })}
      >
        <SupplierList
          sidebarOpened={sidebarOpened}
          setSidebarOpened={setSidebarOpened}
        />
        <SupplierTab />
      </div>
      <div className="content-container content-container--right">
        <RouteSheet />
      </div>
    </div>
  );
}
