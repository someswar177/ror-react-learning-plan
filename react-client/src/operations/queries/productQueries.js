import { gql } from "@apollo/client";
import { PRODUCT_FIELDS } from "../fragments/productFragments";

export const GET_PRODUCTS = gql`
  query {
    products {
      ...ProductFields
    }
  }
  ${PRODUCT_FIELDS}
`;