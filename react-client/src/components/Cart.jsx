import { useQuery, useMutation } from "@apollo/client/react";
import { GET_CART } from "../operations/queries/cartQueries";
import {
  UPDATE_CART_ITEM_QUANTITY,
  REMOVE_FROM_CART,
  EMPTY_CART,
} from "../operations/mutations/cartMutations";
import { useUser } from "../context/UserContext";
import {
  Box,
  Text,
  Button,
  HStack,
  VStack,
  Flex,
  Spinner,
  Heading,
  IconButton,
} from "@chakra-ui/react";

const Cart = () => {
  const { user, cartId } = useUser();

  const { data, loading, error } = useQuery(GET_CART, {
    variables: { userId: user?.id },
    skip: !user?.id,
    fetchPolicy: "network-only",
  });

  const refetchConfig = {
    refetchQueries: [{ query: GET_CART, variables: { userId: user?.id } }],
  };

  const [updateQuantity] = useMutation(UPDATE_CART_ITEM_QUANTITY, refetchConfig);
  const [removeItem] = useMutation(REMOVE_FROM_CART, refetchConfig);
  const [emptyCart, { loading: emptying }] = useMutation(EMPTY_CART, refetchConfig);

  const handleUpdateQuantity = async (cartItemId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      await updateQuantity({ variables: { cartItemId, quantity: newQuantity } });
    } catch (err) {
      alert("Error updating quantity: " + err.message);
    }
  };

  const handleRemoveItem = async (cartItemId) => {
    try {
      await removeItem({ variables: { cartItemId } });
    } catch (err) {
      alert("Error removing item: " + err.message);
    }
  };

  const handleEmptyCart = async () => {
    if (!cartId) return;
    try {
      await emptyCart({ variables: { cartId } });
    } catch (err) {
      alert("Error clearing cart: " + err.message);
    }
  };

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
        <Text color="red.500">Error loading cart: {error.message}</Text>
      </Flex>
    );
  }

  const cart = data?.cart;
  const items = cart?.cartItems || [];

  if (!cart || items.length === 0) {
    return (
      <Flex direction="column" align="center" py={20} gap={4}>
        <Heading size="lg" color="gray.400">
          Your cart is empty
        </Heading>
        <Text color="gray.500">Add some products to get started!</Text>
      </Flex>
    );
  }

  const total = items.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0
  );

  return (
    <Box maxW="800px" mx="auto" p={6}>
      <Flex justify="space-between" align="center" mb={8}>
        <Heading size="xl">Your Cart</Heading>
        <Button
          size="sm"
          variant="outline"
          colorPalette="red"
          borderRadius="md"
          onClick={handleEmptyCart}
          loading={emptying}
        >
          Empty Cart
        </Button>
      </Flex>

      <VStack gap={4} align="stretch">
        {items.map((item) => (
          <Box
            key={item.id}
            border="1px solid"
            borderColor="gray.200"
            borderRadius="lg"
            p={5}
          >
            <Flex justify="space-between" align="center" wrap="wrap" gap={4}>
              <VStack align="start" gap={1} flex={1}>
                <Text fontWeight="bold" fontSize="lg">
                  {item.product?.name}
                </Text>
                <Text color="gray.500">
                  ₹{item.product?.price?.toFixed(2)}
                </Text>
              </VStack>

              <HStack gap={3}>
                <HStack
                  border="1px solid"
                  borderColor="gray.200"
                  borderRadius="md"
                  p={1}
                  gap={0}
                >
                  <IconButton
                    size="sm"
                    variant="ghost"
                    borderRadius="md"
                    onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    aria-label="Decrease quantity"
                  >
                    -
                  </IconButton>
                  <Text
                    fontWeight="bold"
                    minW="40px"
                    textAlign="center"
                    fontSize="md"
                  >
                    {item.quantity}
                  </Text>
                  <IconButton
                    size="sm"
                    variant="ghost"
                    borderRadius="md"
                    onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                    aria-label="Increase quantity"
                  >
                    +
                  </IconButton>
                </HStack>

                <Text fontWeight="bold" minW="80px" textAlign="right">
                  ₹{((item.product?.price || 0) * item.quantity).toFixed(2)}
                </Text>

                <Button
                  size="sm"
                  variant="ghost"
                  colorPalette="red"
                  borderRadius="md"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  Remove
                </Button>
              </HStack>
            </Flex>
          </Box>
        ))}
      </VStack>

      <Box
        mt={6}
        border="1px solid"
        borderColor="gray.300"
        borderRadius="lg"
        p={6}
      >
        <Flex justify="space-between" align="center">
          <Text fontSize="lg">
            Total ({items.length} item{items.length > 1 ? "s" : ""})
          </Text>
          <Text fontSize="2xl" fontWeight="bold">
            ₹{total.toFixed(2)}
          </Text>
        </Flex>
      </Box>
    </Box>
  );
};

export default Cart;