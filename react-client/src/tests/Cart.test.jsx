import { render, screen } from "./test-utils"; // Import from utility, NOT @testing-library/react
import { test, expect } from "vitest";
import "@testing-library/jest-dom";
import Cart from "../components/Cart";

test("renders cart items", () => {
    const cart = [{ id: "1", quantity: 2, product: { name: "Laptop" } }];
    render(<Cart cart={cart} />);
    expect(screen.getByText(/Laptop/)).toBeInTheDocument();
});

test("shows empty cart message", () => {
    render(<Cart cart={[]} />);
    expect(screen.getByText("Cart is empty")).toBeInTheDocument();
});
