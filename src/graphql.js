import { gql } from "@apollo/client";

export const GET_SUPPLIERS = gql`
  query GetSuppliers {
    getSuppliers {
      id
      name
      url
      address
      contacts
      additionalData
    }
  }
`;

export const ADD_SUPPLIER = gql`
  mutation Mutation(
    $name: String!
    $url: String
    $address: String
    $contacts: String
    $additionalData: String
  ) {
    addSupplier(
      name: $name
      url: $url
      address: $address
      contacts: $contacts
      additionalData: $additionalData
    ) {
      id
      name
      url
      address
      contacts
      additionalData
    }
  }
`;

export const UPDATE_SUPPLIER = gql`
  mutation Mutation(
    $updateSupplierId: ID!
    $name: String
    $url: String
    $address: String
    $contacts: String
    $additionalData: String
  ) {
    updateSupplier(
      id: $updateSupplierId
      name: $name
      url: $url
      address: $address
      contacts: $contacts
      additionalData: $additionalData
    ) {
      id
      name
      url
      address
      contacts
      additionalData
    }
  }
`;

export const DELETE_SUPPLIER = gql`
  mutation Mutation($deleteSupplierId: ID!) {
    deleteSupplier(id: $deleteSupplierId)
  }
`;

export const refetchSuppliers = {
  refetchQueries: [{ query: GET_SUPPLIERS }, "GetSuppliers"],
};
