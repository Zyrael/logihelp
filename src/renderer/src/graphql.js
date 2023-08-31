import { gql } from "@apollo/client";

export const GET_SUPPLIERS = gql`
  query GetSuppliers($sort: String) {
    getSuppliers(sort: $sort) {
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
    $id: ID!
    $name: String
    $url: String
    $address: String
    $contacts: String
    $additionalData: String
  ) {
    updateSupplier(
      id: $id
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
  mutation Mutation($id: ID!) {
    deleteSupplier(id: $id)
  }
`;

export const refetchSuppliers = {
  refetchQueries: [{ query: GET_SUPPLIERS }, "GetSuppliers"],
};
