import { render, screen } from "./test-utils";
import "@testing-library/jest-dom";
import { test, expect, vi } from "vitest";
import { MockedProvider } from "@apollo/client/testing/react";
import ProductList from "../components/ProductList";
import { GET_PRODUCTS } from "../operations/queries/productQueries";

// Mock window.alert since ProductCard (rendered by ProductList) uses alert()
vi.stubGlobal("alert", vi.fn());

// Mock ResizeObserver for Chakra UI Slider
if (typeof window !== "undefined") {
    class MockResizeObserver {
        observe() {}
        unobserve() {}
        disconnect() {}
    }
    window.ResizeObserver = MockResizeObserver;
}

const mocks = [
    {
        request: {
            query: GET_PRODUCTS,
            variables: {
                search: null,
                maxPrice: 1000,
            },
        },
        result: {
            data: {
                products: [
                    { __typename: "Product", id: "1", name: "Product 1", price: 100, description: "Description 1" },
                    { __typename: "Product", id: "2", name: "Product 2", price: 200, description: "Description 2" }
                ]
            }
        }
    }
];

test("renders product list from GraphQL", async () => {
    render(
        <MockedProvider mocks={mocks} addTypename={false}>
            <ProductList />
        </MockedProvider>
    );
    expect(await screen.findByText("Product 1")).toBeInTheDocument();
    expect(await screen.findByText("Product 2")).toBeInTheDocument();
});
