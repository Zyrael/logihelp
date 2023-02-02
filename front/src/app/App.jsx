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

  const { loading, data } = useQuery(GET_SUPPLIERS);

  return (
    <div id="app" className="app">
      {loading && <div>Loading...</div>}
      {!loading && (
        <SupplierList className="search" suppliers={data.getSuppliers} />
      )}
      <RouteList />
    </div>
  );
}
