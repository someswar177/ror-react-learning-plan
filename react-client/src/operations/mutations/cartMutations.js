import { gql } from "@apollo/client";

export const ADD_TO_CART = gql`
  mutation ($productId: ID!) {
    addToCart(productId: $productId) {
      id
      quantity
    }
  }
`;