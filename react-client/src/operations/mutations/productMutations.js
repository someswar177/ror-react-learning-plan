import { gql } from "@apollo/client";

export const CREATE_PRODUCT = gql`
  mutation ($name: String!, $price: Float!, $description: String) {
    createProduct(input: {
      name: $name,
      price: $price,
      description: $description
    }) {
      product {
        id
        name
        price
      }
    }
  }
`;