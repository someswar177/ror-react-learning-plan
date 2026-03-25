import { useQuery } from "@apollo/client/react";
import { GET_PRODUCTS } from "../operations/queries/productQueries";
import { SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import ProductCard from "./ProductCard";

const ProductList = () => {
    const { loading, error, data } = useQuery(GET_PRODUCTS);

    if (loading) return <Spinner />;
    if (error) return <Text>Error loading products</Text>;

    return (
        <SimpleGrid columns={[1, 2, 3]} spacing={6} p={5}>
            {data.products.map((p) => (
                <ProductCard key={p.id} product={p} />
            ))}
        </SimpleGrid>
    );
};

export default ProductList;