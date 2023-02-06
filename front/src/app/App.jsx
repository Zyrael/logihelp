import React, { useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { SupplierList, RouteList, EditingWindow } from "../components";
import "./App.css";

export function App() {
  const [editing, setEditing] = useState(true);

  const GET_SUPPLIERS = gql`
    query GetSuppliers {
      getSuppliers {
        id
        name
        webSite
        additionalData
        addresses {
          name
          address
          id
        }
        contacts {
          id
          name
          phoneNumber
        }
      }
    }
  `;

  const ADD_SUPPLIER = gql`
    mutation Mutation(
      $name: String!
      $webSite: String
      $additionalData: String
    ) {
      addSupplier(
        name: $name
        webSite: $webSite
        additionalData: $additionalData
      ) {
        id
        name
        webSite
        additionalData
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_SUPPLIERS);

  // if (error) console.log(error);

  const handleEnableEditing = () => setEditing(true);
  const handleDisableEditing = () => setEditing(false);

  const [addSupplier] = useMutation(ADD_SUPPLIER);

  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>Something went wrong...</div>}
      {!loading && !error && (
        <div id="app" className="app">
          <SupplierList
            suppliers={data.getSuppliers}
            editing={editing}
            handleEnableEditing={handleEnableEditing}
          />
          <RouteList />
          <EditingWindow
            editing={editing}
            handleDisableEditing={handleDisableEditing}
            addSupplier={addSupplier}
          />
        </div>
      )}
    </>
  );
}
