import { Flex, Button, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <Flex bg="blue.500" p={4} color="white" justify="space-between">
            <Text fontWeight="bold">E-Commerce</Text>

            <Button onClick={() => navigate("/cart")}>
                Cart
            </Button>
        </Flex>
    );
};

export default Navbar;