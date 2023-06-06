import React from "react";
import cn from "classnames";
import { ReactComponent as CrossSVG } from "../../assets/icons/cross.svg";
import "./LeftMenu.css";

export function LeftMenu({ logout, leftMenuOpened, setLeftMenuOpened }) {
  return (
    <div
      className={cn("left-menu", {
        opened: leftMenuOpened,
      })}
    >
      {/* <div className="left-menu-header"> */}
      {/*  <button */}
      {/*    type="button" */}
      {/*    className="close-left-menu-btn" */}
      {/*    onClick={() => setLeftMenuOpened(false)} */}
      {/*  > */}
      {/*    <CrossSVG className="close-left-menu-icon" /> */}
      {/*  </button> */}
      {/* </div> */}
      <button type="button" className="logout-btn" onClick={logout}>
        Выйти
      </button>
    </div>
  );
}
