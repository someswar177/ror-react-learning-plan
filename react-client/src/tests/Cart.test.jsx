import { render, screen } from "./test-utils";
import "@testing-library/jest-dom";
import { test, expect } from "vitest";
import { MockedProvider } from "@apollo/client/testing/react";
import Cart from "../components/Cart";
import { GET_CART } from "../operations/queries/cartQueries";

const mocks = [
    {
        request: { query: GET_CART },
        result: {
            data: {
                carts: [
                    {
                        id: "cart-1",
                        cartItems: [
                            { id: "item-1", quantity: 2, product: { name: "Laptop" } }
                        ]
                    }
                ]
            }
        }
    }
];

test("renders cart items from GraphQL", async () => {
    render(
        <MockedProvider mocks={mocks} addTypename={false}>
            <Cart />
        </MockedProvider>
    );

    // Use findByText because the query is asynchronous
    expect(await screen.findByText(/Laptop x 2/i)).toBeInTheDocument();
});

test("shows empty cart message when no cart exists", async () => {
    const emptyMock = [{
        request: { query: GET_CART },
        result: { data: { carts: [] } }
    }];

    render(
        <MockedProvider mocks={emptyMock} addTypename={false}>
            <Cart />
        </MockedProvider>
    );

    expect(await screen.findByText(/Cart empty/i)).toBeInTheDocument();
});
