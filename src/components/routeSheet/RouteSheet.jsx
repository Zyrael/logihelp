import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./RouteSheet.css";
import { ReactComponent as Times } from "../../assets/icons/cross.svg";
import { ReactComponent as Print } from "../../assets/icons/printer.svg";
import { ReactComponent as DocumentSVG } from "../../assets/icons/document.svg";
import { ReactComponent as LeftSVG } from "../../assets/icons/arrow-undo-up-left.svg";
import { removeAllRoutes } from "./routeSheetSlice";
import { PDFView } from "./pdfView";
import { RouteList } from "./routeList";
import { PlainRouteSheet } from "./plainRouteSheet";

const modeMap = {
  routeList: (routes) => <RouteList routes={routes} />,
  print: (routes) => <PDFView routes={routes} />,
  plain: (routes) => <PlainRouteSheet routes={routes} />,
};

export function RouteSheet() {
  const routes = useSelector((state) => state.routeSheet.routes);
  const dispatch = useDispatch();
  const handleRemoveRoutes = () => {
    dispatch(removeAllRoutes());
  };

  const [mode, setMode] = useState("routeList");

  return (
    <>
      <div className="route-sheet-header">
        <div className="route-sheet-title">
          {print ? "Печать" : "Маршрутный лист"}
        </div>
        {mode === "routeList" && (
          <>
            <button
              type="button"
              className="round-btn clear"
              onClick={handleRemoveRoutes}
              disabled={routes.length === 0}
              title="Очистить список"
            >
              <Times className="times-icon" />
            </button>
            <button
              type="button"
              className="round-btn print"
              onClick={() => setMode("plain")}
              disabled={routes.length === 0}
              title="Вывести информацию"
            >
              <DocumentSVG className="print-icon" />
            </button>
            <button
              type="button"
              className="round-btn print"
              onClick={() => setMode("print")}
              disabled={routes.length === 0}
              title="Печать"
            >
              <Print className="print-icon" />
            </button>
          </>
        )}
        {mode !== "routeList" && (
          <button
            type="button"
            className="round-btn cancel-print"
            onClick={() => setMode("routeList")}
            title="Отмена"
          >
            <LeftSVG className="cancel-print-icon" />
          </button>
        )}
      </div>
      <div className="route-sheet-main">{modeMap[mode](routes)}</div>
    </>
  );
}
