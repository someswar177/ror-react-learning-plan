import { useState } from "react";
import { useQuery } from "@apollo/client/react";
import { GET_PRODUCTS } from "../operations/queries/productQueries";
import { SimpleGrid, Spinner, Text, Flex, Box, Input, Stack } from "@chakra-ui/react";
import { Slider } from "./ui/slider";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [maxPrice, setMaxPrice] = useState(300000);

  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    variables: {
      search: searchTerm || null,
      maxPrice: maxPrice || null,
    },
  });

  return (
    <Box>
      <Stack spacing={6} mb={8}>
        <Box>
          <Text mb={2} fontWeight="bold">Search Products</Text>
          <Input
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Box>

        <Box>
          <Text mb={2} fontWeight="bold">Max Price: {maxPrice}</Text>
          <Slider
            min={0}
            max={1000000}
            step={1000}
            defaultValue={[100000]}
            onValueChange={(e) => setMaxPrice(e.value[0])}
          />
        </Box>
      </Stack>

      {loading && (
        <Flex justify="center" py={20}>
          <Spinner size="xl" />
        </Flex>
      )}

      {error && (
        <Flex justify="center" py={20}>
          <Text color="red.500">Error loading products: {error.message}</Text>
        </Flex>
      )}

      {!loading && !error && (!data?.products?.length ? (
        <Flex justify="center" py={20}>
          <Text color="gray.500">No products found matching your criteria.</Text>
        </Flex>
      ) : (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap={6}>
          {data.products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </SimpleGrid>
      ))}
    </Box>
  );
};

export default ProductList;