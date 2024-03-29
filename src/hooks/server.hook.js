import { useMutation, useQuery } from "@apollo/client";
import uniqid from "uniqid";
import {
  ADD_SUPPLIER,
  DELETE_SUPPLIER,
  GET_SUPPLIERS,
  UPDATE_SUPPLIER,
  refetchSuppliers,
} from "../graphql";

let suppliers = [
  {
    id: uniqid(),
    name: "lorem ipsum",
    address: "lorem ipsum",
    contacts: "lorem ipsum",
  },
  {
    id: uniqid(),
    name: "lorem ipsum",
    address: "lorem ipsum",
    contacts: "lorem ipsum",
  },
  {
    id: uniqid(),
    name: "lorem ipsum",
    address: "lorem ipsum",
    contacts: "lorem ipsum",
  },
  {
    id: uniqid(),
    name: "lorem ipsum",
    address: "lorem ipsum",
    contacts: "lorem ipsum",
  },
  {
    id: uniqid(),
    name: "lorem ipsum",
    address: "lorem ipsum",
    contacts: "lorem ipsum",
  },
  {
    id: uniqid(),
    name: "lorem ipsum",
    address: "lorem ipsum",
    contacts: "lorem ipsum",
  },
];

const sortingMethod = {
  asc: (supplierA, supplierB) => {
    const nameA = supplierA.name.toLowerCase();
    const nameB = supplierB.name.toLowerCase();
    if (nameA > nameB) return 1;
    if (nameA < nameB) return -1;
    return 0;
  },
  desc: (supplierA, supplierB) => {
    const nameA = supplierA.name.toLowerCase();
    const nameB = supplierB.name.toLowerCase();
    if (nameA > nameB) return -1;
    if (nameA < nameB) return 1;
    return 0;
  },
};

export function useServer() {
  const [addf] = useMutation(ADD_SUPPLIER, refetchSuppliers);
  const [updatef] = useMutation(UPDATE_SUPPLIER, refetchSuppliers);
  const [deletef] = useMutation(DELETE_SUPPLIER, refetchSuppliers);

  const getSuppliers = ({ sort = "asc", pollInterval = 10000 }) => {
    if (import.meta.env.MODE === "mock") {
      return {
        loading: false,
        error: false,
        data: {
          getSuppliers: [...suppliers].sort(sortingMethod[sort]),
        },
      };
    }

    return useQuery(GET_SUPPLIERS, { variables: { sort }, pollInterval });
  };

  const addSupplier = (data) => {
    if (import.meta.env.MODE === "mock")
      return new Promise((resolve) => {
        const newSupplier = { ...data, id: uniqid() };
        suppliers.push(newSupplier);
        resolve({ data: { addSupplier: newSupplier } });
      });

    return addf({ variables: data });
  };

  const updateSupplier = (data) => {
    if (import.meta.env.MODE === "mock") {
      return new Promise((resolve) => {
        const current = suppliers.findIndex(({ id }) => data.id === id);
        suppliers[current] = { ...suppliers[current], ...data };
        resolve({ data: { updateSupplier: data } });
      });
    }

    return updatef({ variables: data });
  };

  const deleteSupplier = (data) => {
    if (import.meta.env.MODE === "mock")
      return new Promise((resolve) => {
        suppliers = suppliers.filter(({ id }) => data.id !== id);
        resolve({ data: { deleteSupplier: true } });
      });

    return deletef({ variables: data });
  };

  return { getSuppliers, addSupplier, updateSupplier, deleteSupplier };
}
