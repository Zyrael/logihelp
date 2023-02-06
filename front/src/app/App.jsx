import React from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
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

  const ADD_SUPPLIER = gql`
    mutation Mutation($name: String!, $phoneNumber: String, $webSite: String) {
      addSupplier(name: $name, phoneNumber: $phoneNumber, webSite: $webSite) {
        id
        name
      }
    }
  `;

  const { loading, data } = useQuery(GET_SUPPLIERS);

  const [addSupplier] = useMutation(ADD_SUPPLIER);

  const handleButton = () =>
    addSupplier({
      variables: {
        name: "test",
        phoneNumber: "999",
        webSite: "www.test.com",
      },
    });

  return (
    <div id="app" className="app">
      {loading && <div>Loading...</div>}
      {!loading && (
        <SupplierList className="search" suppliers={data.getSuppliers} />
      )}
      <button type="button" onClick={handleButton}>
        test
      </button>
      <RouteList />
    </div>
  );
}
