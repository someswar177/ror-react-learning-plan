import { render, screen } from "@testing-library/react"
import { MockProvider } from "@apollo/client/testing"
import { ProductList } from "../components/ProductList";
import { GET_PRODUCTS } from "../operations/queries/productQueries";

const mocks = [
    {
        request: {
            query: GET_PRODUCTS
        },
        result: {
            data: {
                products: [
                    { id: 1, name: "Product 1", price: 100, description: "Description 1" },
                    { id: 2, name: "Product 2", price: 200, description: "Description 2" }
                ]
            }
        }
    }
]

test("renders product list from GraphQL", async () => {
    render(
        <MockProvider mocks={mocks} addTypename={false}>
            <ProductList />
        </MockProvider>
    )
    expect(await screen.findByText("Product 1")).toBeInTheDocument();
    expect(await screen.findByText("Product 2")).toBeInTheDocument();
})