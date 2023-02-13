import { gql } from "@apollo/client";

export const GET_SUPPLIERS = gql`
  query GetSuppliers {
    getSuppliers {
      id
      name
      url
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

export const ADD_SUPPLIER = gql`
  mutation Mutation(
    $name: String!
    $url: String
    $additionalData: String
    $addresses: String
    $contacts: String
  ) {
    addSupplier(
      name: $name
      url: $url
      additionalData: $additionalData
      addresses: $addresses
      contacts: $contacts
    ) {
      id
      name
      url
      additionalData
    }
  }
`;

export const UPDATE_SUPPLIER = gql`
  mutation Mutation(
    $updateSupplierId: ID!
    $name: String
    $url: String
    $additionalData: String
    $addresses: String
    $contacts: String
  ) {
    updateSupplier(
      id: $updateSupplierId
      name: $name
      url: $url
      additionalData: $additionalData
      addresses: $addresses
      contacts: $contacts
    ) {
      id
      name
      url
      additionalData
    }
  }
`;

export const UPDATE_CONTACT = gql`
  mutation Mutation(
    $updateContactId: ID!
    $name: String
    $phoneNumber: String
  ) {
    updateContact(
      id: $updateContactId
      name: $name
      phoneNumber: $phoneNumber
    ) {
      id
      name
      phoneNumber
    }
  }
`;

export const UPDATE_ADDRESS = gql`
  mutation Mutation($updateAddressId: ID!, $name: String, $address: String) {
    updateAddress(id: $updateAddressId, name: $name, address: $address) {
      id
      name
      address
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
