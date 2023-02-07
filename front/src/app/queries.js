import { gql } from "@apollo/client";

export const GET_SUPPLIERS = gql`
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

export const ADD_SUPPLIER = gql`
  mutation Mutation($name: String!, $webSite: String, $additionalData: String) {
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

export const refetchSuppliers = {
  refetchQueries: [{ query: GET_SUPPLIERS }, "GetSuppliers"],
};
