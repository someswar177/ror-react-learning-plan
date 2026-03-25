import { gql } from "@apollo/client";

export const GET_CART = gql`
  query {
    carts {
      id
      cartItems {
        id
        quantity
        product {
          id
          name
          price
        }
      }
    }
  }
`;