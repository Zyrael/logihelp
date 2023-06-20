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

export function useServer() {
  const getSuppliers = (pollInterval = 10000) => {
    if (import.meta.env.MODE === "mock") {
      return {
        loading: false,
        error: false,
        data: {
          getSuppliers: suppliers,
        },
      };
    }

    return useQuery(GET_SUPPLIERS, { pollInterval });
  };

  const addSupplier = (data) => {
    if (import.meta.env.MODE === "mock")
      return new Promise(() => {
        suppliers.push(data);
      });

    const [addf] = useMutation(ADD_SUPPLIER, refetchSuppliers);
    return addf({ variables: data });
  };

  const updateSupplier = (data) => {
    if (import.meta.env.MODE === "mock") {
      return new Promise(() => {
        suppliers.push(data);
      });
    }

    const [updatef] = useMutation(UPDATE_SUPPLIER, refetchSuppliers);
    return updatef({ variables: data });
  };

  const deleteSupplier = (data) => {
    if (import.meta.env.MODE === "mock")
      return new Promise(() => {
        suppliers = suppliers.filter(({ id }) => data.id !== id);
      });

    const [deletef] = useMutation(DELETE_SUPPLIER, refetchSuppliers);
    return deletef({ variables: data });
  };

  return { getSuppliers, addSupplier, updateSupplier, deleteSupplier };
}
