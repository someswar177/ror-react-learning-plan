import { gql } from "@apollo/client";

export const GET_USER_BY_EMAIL = gql`
  query GetUserByEmail($email: String!) {
    userByEmail(email: $email) {
      id
      name
      email
    }
  }
`;

export const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      email
    }
  }
`;
