import React from "react";
import data from "../data";
import { SupplierList, RouteList } from "../components";
import "./App.css";

export function App() {
  return (
    <div id="app" className="app">
      <SupplierList className="search" suppliers={data} />
      <RouteList />
    </div>
  );
}
