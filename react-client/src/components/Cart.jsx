import { Box, Text } from "@chakra-ui/react";

const Cart = ({ cart }) => {
    if (!cart || cart.length === 0) {
        return <Text>Cart is empty</Text>;
    }

    return (
        <Box p={5}>
            {cart.map((item) => (
                <Text key={item.id}>
                    {item.product.name} x {item.quantity}
                </Text>
            ))}
        </Box>
    );
};

export default Cart;