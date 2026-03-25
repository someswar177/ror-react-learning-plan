import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser($name: String!, $email: String!) {
    createUser(input: { name: $name, email: $email }) {
      user {
        id
        name
        email
      }
      errors
    }
  }
`;

export const CREATE_CART = gql`
  mutation CreateCart($userId: ID!) {
    createCart(input: { userId: $userId }) {
      cart {
        id
        userId
      }
      errors
    }
  }
`;
