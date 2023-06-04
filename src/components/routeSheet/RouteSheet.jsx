import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteElement } from "./routeElement/index";
import "./RouteSheet.css";
import { ReactComponent as Times } from "../../assets/icons/close.svg";
import { ReactComponent as Print } from "../../assets/icons/file.svg";
import { ReactComponent as LeftSVG } from "../../assets/icons/arrow-left.svg";
import { removeAllRoutes } from "./routeSheetSlice";
import { PDFView } from "../pdfView";

export function RouteSheet() {
  const routes = useSelector((state) => state.routeSheet.routes);
  const dispatch = useDispatch();
  const handleRemoveRoutes = () => {
    dispatch(removeAllRoutes());
  };

  const [print, setPrint] = useState(false);

  return (
    <>
      <div className="route-sheet-header">
        <div className="route-sheet-title">
          {print ? "Печать" : "Маршрутный лист"}
        </div>
        {!print && (
          <>
            <button
              type="button"
              className="blue-btn clear"
              onClick={handleRemoveRoutes}
              disabled={routes.length === 0}
              title="Очистить список"
            >
              <Times className="times-icon" />
            </button>
            <button
              type="button"
              className="blue-btn print"
              onClick={() => setPrint(true)}
              disabled={routes.length === 0}
              title="Печать"
            >
              <Print className="print-icon" />
            </button>
          </>
        )}
        {print && (
          <button
            type="button"
            className="blue-btn cancel-print"
            onClick={() => setPrint(false)}
            title="Отмена"
          >
            <LeftSVG className="cancel-print-icon" />
          </button>
        )}
      </div>
      {!print && (
        <div className="route-sheet-container">
          <ul className="route-sheet">
            {routes.map((route) => (
              <RouteElement key={route.id} route={route} />
            ))}
          </ul>
        </div>
      )}
      {print && <PDFView />}
    </>
  );
}
