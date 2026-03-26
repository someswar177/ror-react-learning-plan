import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client/react";
import { GET_PRODUCT } from "../operations/queries/productQueries";
import { ADD_TO_CART } from "../operations/mutations/cartMutations";
import { GET_CART } from "../operations/queries/cartQueries";
import { useUser } from "../context/UserContext";
import Navbar from "../components/Navbar";
import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  HStack,
  Spinner,
  Flex,
  Badge,
} from "@chakra-ui/react";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cartId, user } = useUser();

  const { data, loading, error } = useQuery(GET_PRODUCT, {
    variables: { id },
  });

  const [addToCart, { loading: adding }] = useMutation(ADD_TO_CART, {
    refetchQueries: user ? [{ query: GET_CART, variables: { userId: user.id } }] : [],
  });

  const handleAddToCart = async () => {
    if (!cartId) {
      alert("No cart found. Please log in again.");
      return;
    }

    try {
      const { data: result } = await addToCart({
        variables: { cartId, productId: id, quantity: 1 },
      });

      if (result?.addToCart?.errors?.length > 0) {
        alert("Failed to add: " + result.addToCart.errors.join(", "));
      } else {
        alert("Added to cart!");
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <Flex justify="center" align="center" minH="60vh">
          <Spinner size="xl" />
        </Flex>
      </>
    );
  }

  if (error || !data?.product) {
    return (
      <>
        <Navbar />
        <Flex justify="center" align="center" minH="60vh">
          <Text color="red.500" fontSize="lg">Product not found.</Text>
        </Flex>
      </>
    );
  }

  const product = data.product;

  return (
    <>
      <Navbar />
      <Box maxW="800px" mx="auto" p={8} mt={6}>
        <Button
          variant="ghost"
          mb={6}
          onClick={() => navigate("/")}
          borderRadius="md"
        >
          Back to Products
        </Button>

        <Box
          borderRadius="lg"
          p={10}
          border="1px solid"
          borderColor="gray.200"
        >
          <VStack align="stretch" gap={6}>
            <HStack justify="space-between" align="start">
              <Heading size="2xl">
                {product.name}
              </Heading>
              <Badge
                colorPalette="green"
                px={3}
                py={1}
                borderRadius="full"
                fontSize="lg"
              >
                ₹{product.price?.toFixed(2)}
              </Badge>
            </HStack>

            <Box h="1px" bg="gray.200" />

            <Box>
              <Heading size="sm" mb={3} textTransform="uppercase" letterSpacing="wider">
                Description:
              </Heading>
              <Text fontSize="lg" lineHeight="tall">
                {product.description || "No description available for this product."}
              </Text>
            </Box>

            <Box h="1px" bg="gray.200" />

            <Button
              onClick={handleAddToCart}
              loading={adding}
              loadingText="Adding..."
              size="lg"
              colorPalette="blue"
              borderRadius="md"
              py={7}
              fontSize="md"
            >
              Add to Cart
            </Button>
          </VStack>
        </Box>
      </Box>
    </>
  );
};

export default ProductDetailPage;
