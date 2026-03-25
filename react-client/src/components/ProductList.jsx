import { useQuery } from "@apollo/client/react";
import { GET_PRODUCTS } from "../operations/queries/productQueries";
import { SimpleGrid, Spinner, Text, Flex } from "@chakra-ui/react";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const { loading, error, data } = useQuery(GET_PRODUCTS);

  if (loading) {
    return (
      <Flex justify="center" py={20}>
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex justify="center" py={20}>
        <Text color="red.500">Error loading products: {error.message}</Text>
      </Flex>
    );
  }

  if (!data?.products?.length) {
    return (
      <Flex justify="center" py={20}>
        <Text color="gray.500">No products available yet.</Text>
      </Flex>
    );
  }

  return (
    <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap={6}>
      {data.products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </SimpleGrid>
  );
};

export default ProductList;