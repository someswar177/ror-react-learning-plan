import Navbar from "../components/Navbar";
import ProductList from "../components/ProductList";
import { Box, Heading } from "@chakra-ui/react";

const Home = () => {
  return (
    <>
      <Navbar />
      <Box maxW="1200px" mx="auto" p={6}>
        <Heading size="xl" mb={6}>
          Browse Products
        </Heading>
        <ProductList />
      </Box>
    </>
  );
};

export default Home;