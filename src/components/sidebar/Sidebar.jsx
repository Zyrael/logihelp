import React from "react";
import cn from "classnames";
import { ReactComponent as CrossSVG } from "../../assets/icons/cross.svg";
import "./Sidebar.css";

export function Sidebar({ logout, sidebarOpened, setSidebarOpened }) {
  return (
    <div
      className={cn("sidebar", {
        opened: sidebarOpened,
      })}
    >
      <div className="sidebar-header">
        <button
          type="button"
          className="close-sidebar-btn"
          onClick={() => setSidebarOpened(false)}
        >
          <CrossSVG className="close-sidebar-icon" />
        </button>
      </div>
      <div className="logout-btn-container">
        <button type="button" className="logout-btn" onClick={logout}>
          Выйти
        </button>
      </div>
    </div>
  );
}
