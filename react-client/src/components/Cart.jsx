import { useQuery } from "@apollo/client/react";
import { GET_CART } from "../operations/queries/cartQueries";
import { Box, Text } from "@chakra-ui/react";

const Cart = () => {
    const { data, loading } = useQuery(GET_CART);

    if (loading) return <Text>Loading...</Text>;

    const cart = data?.carts?.[0];

    if (!cart) return <Text>Cart empty</Text>;

    return (
        <Box p={5}>
            {cart.cartItems.map((item) => (
                <Text key={item.id}>
                    {item.product.name} x {item.quantity}
                </Text>
            ))}
        </Box>
    );
};

export default Cart;