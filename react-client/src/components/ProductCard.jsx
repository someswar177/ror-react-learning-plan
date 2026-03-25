import { Box, Text, Button } from "@chakra-ui/react";
import { useMutation } from "@apollo/client/react";
import { ADD_TO_CART } from "../operations/mutations/cartMutations";

const ProductCard = ({ product }) => {
    const [addToCart] = useMutation(ADD_TO_CART);

    const handleAdd = () => {
        addToCart({
            variables: { productId: product.id },
        });
    };

    return (
        <Box borderWidth="1px" p={4} borderRadius="lg">
            <Text fontWeight="bold">{product.name}</Text>
            <Text>₹{product.price}</Text>

            <Button mt={2} onClick={handleAdd} colorScheme="blue">
                Add to Cart
            </Button>
        </Box>
    );
};

export default ProductCard;