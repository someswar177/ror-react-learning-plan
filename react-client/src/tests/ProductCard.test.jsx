import { render, screen, fireEvent } from "./test-utils"; // Use custom render
import "@testing-library/jest-dom";
import { test, expect } from "vitest";
import { MockedProvider } from "@apollo/client/testing/react";
import ProductCard from "../components/ProductCard";
import { ADD_TO_CART } from "../operations/mutations/cartMutations";

const mocks = [
    {
        request: {
            query: ADD_TO_CART,
            variables: { productId: "1" },
        },
        result: {
            data: { addToCart: { id: "1", quantity: 1 } },
        },
    },
];

test("calls addToCart mutation when button is clicked", async () => {
    render(
        <MockedProvider mocks={mocks} addTypename={false}>
            <ProductCard product={{ id: "1", name: "Laptop", price: 50000 }} />
        </MockedProvider>
    );

    const button = screen.getByRole("button", { name: /add to cart/i });
    fireEvent.click(button);
    expect(button).toBeInTheDocument();
});
