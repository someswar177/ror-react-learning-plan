import { gql } from "@apollo/client";
import { PRODUCT_FIELDS } from "../fragments/productFragments";

export const GET_PRODUCTS = gql`
  query GetProducts($search: String, $maxPrice: Float) {
    products(search: $search, maxPrice: $maxPrice) {
      ...ProductFields
    }
  }
  ${PRODUCT_FIELDS}
`;

export const GET_PRODUCT = gql`
  query GetProduct($id: ID!) {
    product(id: $id) {
      ...ProductFields
    }
  }
  ${PRODUCT_FIELDS}
`;