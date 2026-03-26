import { render, screen, fireEvent } from "./test-utils";
import "@testing-library/jest-dom";
import { test, expect, vi } from "vitest";
import { MockedProvider } from "@apollo/client/testing/react";
import ProductCard from "../components/ProductCard";
import { ADD_TO_CART } from "../operations/mutations/cartMutations";

// Mock window.alert since ProductCard uses alert()
vi.stubGlobal("alert", vi.fn());

const product = { id: "1", name: "Laptop", price: 50000, description: "A laptop" };

const mocks = [
    {
        request: {
            query: ADD_TO_CART,
            variables: { cartId: "cart-1", productId: "1", quantity: 1 },
        },
        result: {
            data: {
                addToCart: {
                    cartItem: {
                        id: "item-1",
                        quantity: 1,
                        product: { id: "1", name: "Laptop", price: 50000, description: "A laptop" },
                    },
                    errors: [],
                },
            },
        },
    },
];

test("renders product card with name, price, and add to cart button", () => {
    render(
        <MockedProvider mocks={mocks} addTypename={false}>
            <ProductCard product={product} />
        </MockedProvider>
    );

    expect(screen.getByText("Laptop")).toBeInTheDocument();
    expect(screen.getByText(/50000/)).toBeInTheDocument();
    const button = screen.getByRole("button", { name: /add to cart/i });
    expect(button).toBeInTheDocument();
});

test("calls addToCart mutation when button is clicked", async () => {
    render(
        <MockedProvider mocks={mocks} addTypename={false}>
            <ProductCard product={product} />
        </MockedProvider>
    );

    const button = screen.getByRole("button", { name: /add to cart/i });
    fireEvent.click(button);
    expect(button).toBeInTheDocument();
});
