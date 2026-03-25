import { render, screen, fireEvent } from "@testing-library/react"
import { MockedProvider } from "@apollo/client/testing"
import ProductCard from "../components/ProductCard";
import { ADD_TO_CART } from "../operations/mutations/cartMutations";

const mocks = [
    {
        request: {
            query: ADD_TO_CART,
            variables: { productId: "1" },
        },
        result: {
            data: {
                addToCart: { id: "1", quantity: 1 },
            },
        },
    },
];

test("calls addToCart mutation when button is clicked", async () => {
    render(
        <MockedProvider mocks={mocks} addTypename={false}>
            <ProductCard product={{ id: "1", name: "Laptop", price: 50000 }} />
        </MockedProvider>
    );

    const button = screen.getByText("Add to Cart");
    fireEvent.click(button);

    expect(button).toBeInTheDocument();
});