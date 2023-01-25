import React, { useEffect } from "react";
import { open, readFile } from "fs";
import { SupplierList, RouteList } from "../components";
// import data from "../data";
import "./App.css";

export function App() {
  let data;
  useEffect(() => {
    open("../data.json", "r").then((file) => {
      readFile(file, "utf-8").then(console.log);
    });
  }, []);

  return (
    <div id="app" className="app">
      <SupplierList className="search" suppliers={data} />
      <RouteList />
    </div>
  );
}
