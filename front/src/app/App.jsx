import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { SupplierList, RouteList, Modal, SupplierForm } from "../components";
import { GET_SUPPLIERS, ADD_SUPPLIER, refetchSuppliers } from "./queries";
import "./App.css";

export function App() {
  const { loading, error, data } = useQuery(GET_SUPPLIERS);
  const [addSupplier] = useMutation(ADD_SUPPLIER, refetchSuppliers);

  const [modalOpened, setModalOpened] = useState(false);

  const openModal = () => setModalOpened(true);
  const closeModal = () => setModalOpened(false);

  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>Something went wrong...</div>}
      {!loading && !error && (
        <div id="app" className="app">
          <SupplierList suppliers={data.getSuppliers} openModal={openModal} />
          <RouteList />
          {modalOpened && (
            <Modal isOpened={modalOpened} closeModal={closeModal}>
              <SupplierForm closeModal={closeModal} addSupplier={addSupplier} />
            </Modal>
          )}
        </div>
      )}
    </>
  );
}
