import React from "react";
import { gql, useQuery } from "@apollo/client";
import { SupplierList, RouteList } from "../components";
import "./App.css";

export function App() {
  const GET_SUPPLIERS = gql`
    query GetSuppliers {
      getSuppliers {
        id
        name
      }
    }
  `;

  const { data } = useQuery(GET_SUPPLIERS);

  return (
    <div id="app" className="app">
      <SupplierList className="search" suppliers={data.getSuppliers} />
      <RouteList />
    </div>
  );
}
