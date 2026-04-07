import { gql } from "@apollo/client";

export const ADD_TO_CART = gql`
  mutation AddToCart($cartId: ID!, $productId: ID!, $quantity: Int!) {
    addToCart(input: { cartId: $cartId, productId: $productId, quantity: $quantity }) {
      cartItem {
        id
        quantity
        product {
          id
          name
          price
          description
        }
      }
      errors
    }
  }
`;

export const REMOVE_FROM_CART = gql`
  mutation RemoveFromCart($cartItemId: ID!) {
    removeFromCart(input: { cartItemId: $cartItemId }) {
      message
      errors
    }
  }
`;

export const EMPTY_CART = gql`
  mutation EmptyCart($cartId: ID!) {
    emptyCart(input: { cartId: $cartId }) {
      message
      errors
    }
  }
`;

export const UPDATE_CART_ITEM_QUANTITY = gql`
  mutation UpdateCartItemQuantity($cartItemId: ID!, $quantity: Int!) {
    updateCartItemQuantity(input: { cartItemId: $cartItemId, quantity: $quantity }) {
      cartItem {
        id
        quantity
        product {
          id
          name
          price
          description
        }
      }
      errors
    }
  }
`;