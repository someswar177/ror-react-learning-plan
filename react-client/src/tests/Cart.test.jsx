import { render, screen } from "./test-utils";
import "@testing-library/jest-dom";
import { test, expect, vi } from "vitest";
import { MockedProvider } from "@apollo/client/testing/react";
import Cart from "../components/Cart";
import { GET_CART } from "../operations/queries/cartQueries";

// Mock window.alert since Cart uses alert()
vi.stubGlobal("alert", vi.fn());

// Cart queries by userId. We need to mock useUser to return a user.
// Since UserProvider is in the wrapper but has no user by default,
// we mock the UserContext module to provide a logged-in user.
vi.mock("../context/UserContext", () => ({
    UserProvider: ({ children }) => children,
    useUser: () => ({
        user: { id: "1", name: "Test User", email: "test@test.com" },
        cartId: "cart-1",
        setUser: vi.fn(),
        setCartId: vi.fn(),
        logout: vi.fn(),
        isLoggedIn: true,
    }),
}));

const mocks = [
    {
        request: {
            query: GET_CART,
            variables: { userId: "1" },
        },
        result: {
            data: {
                cart: {
                    id: "cart-1",
                    cartItems: [
                        {
                            id: "item-1",
                            quantity: 2,
                            product: {
                                id: "p1",
                                name: "Laptop",
                                price: 50000,
                                description: "A laptop",
                            },
                        },
                    ],
                },
            },
        },
    },
];

test("renders cart items from GraphQL", async () => {
    render(
        <MockedProvider mocks={mocks} addTypename={false}>
            <Cart />
        </MockedProvider>
    );

    expect(await screen.findByText("Laptop")).toBeInTheDocument();
    expect(await screen.findByText("2")).toBeInTheDocument();
});

test("shows empty cart message when no items exist", async () => {
    const emptyMock = [
        {
            request: {
                query: GET_CART,
                variables: { userId: "1" },
            },
            result: {
                data: {
                    cart: {
                        id: "cart-1",
                        cartItems: [],
                    },
                },
            },
        },
    ];

    render(
        <MockedProvider mocks={emptyMock} addTypename={false}>
            <Cart />
        </MockedProvider>
    );

    expect(await screen.findByText(/cart is empty/i)).toBeInTheDocument();
});
