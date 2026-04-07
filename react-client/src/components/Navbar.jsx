import { Flex, Button, Text, HStack, Box } from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../context/UserContext";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, isLoggedIn } = useUser();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <Flex
      px={6}
      py={4}
      justify="space-between"
      align="center"
      borderBottom="1px solid"
      borderColor="gray.200"
      position="sticky"
      top={0}
      zIndex={10}
      bg="white"
    >
      <Text
        fontSize="xl"
        fontWeight="bold"
        cursor="pointer"
        onClick={() => navigate("/")}
      >
        ShopCart
      </Text>

      {isLoggedIn && (
        <HStack gap={3}>
          <Button
            variant={isActive("/") ? "solid" : "ghost"}
            onClick={() => navigate("/")}
            borderRadius="md"
            size="sm"
          >
            Products
          </Button>

          <Button
            variant={isActive("/cart") ? "solid" : "ghost"}
            onClick={() => navigate("/cart")}
            borderRadius="md"
            size="sm"
          >
            Cart
          </Button>

          <Box w="1px" h="20px" bg="gray.300" />

          <Text fontSize="sm" color="gray.600">
            Hi, <Text as="span" fontWeight="semibold">{user?.name}</Text>
          </Text>

          <Button
            size="sm"
            variant="outline"
            borderRadius="md"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </HStack>
      )}
    </Flex>
  );
};

export default Navbar;