import { Box, Text, Button, VStack, HStack, Badge } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client/react";
import { ADD_TO_CART } from "../operations/mutations/cartMutations";
import { GET_CART } from "../operations/queries/cartQueries";
import { useUser } from "../context/UserContext";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { cartId, user } = useUser();

  const [addToCart, { loading }] = useMutation(ADD_TO_CART, {
    refetchQueries: user ? [{ query: GET_CART, variables: { userId: user.id } }] : [],
  });

  const handleAdd = async (e) => {
    e.stopPropagation();
    console.log(cartId);

    if (!cartId) {
      alert("Please log in first");
      return;
    }

    try {
      console.log("data");
      const { data } = await addToCart({
        variables: { cartId, productId: product.id, quantity: 1 },
      });

      if (data?.addToCart?.errors?.length > 0) {
        alert("Failed to add: " + data.addToCart.errors.join(", "));
      } else {
        alert(`${product.name} added to cart!`);
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <Box
      border="1px solid"
      borderColor="gray.200"
      borderRadius="lg"
      p={6}
      cursor="pointer"
      onClick={() => navigate(`/products/${product.id}`)}
      _hover={{ borderColor: "gray.400" }}
    >
      <VStack align="stretch" gap={4}>
        <Text fontWeight="bold" fontSize="lg" lineClamp={1}>
          {product.name}
        </Text>

        <Text color="gray.500" fontSize="sm" lineClamp={2}>
          {product.description || "No description"}
        </Text>

        <HStack justify="space-between" align="center">
          <Badge
            colorPalette="green"
            px={3}
            py={1}
            borderRadius="full"
            fontSize="md"
          >
            INR {product.price}
          </Badge>

          <Button
            size="sm"
            colorPalette="blue"
            borderRadius="md"
            onClick={handleAdd}
            loading={loading}
          >
            Add to Cart
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default ProductCard;