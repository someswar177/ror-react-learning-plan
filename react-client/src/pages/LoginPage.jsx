import { useState } from "react";
import { useApolloClient, useMutation } from "@apollo/client/react";
import { GET_USER_BY_EMAIL } from "../operations/queries/userQueries";
import { GET_CART } from "../operations/queries/cartQueries";
import { CREATE_CART } from "../operations/mutations/userMutations";
import { useUser } from "../context/UserContext";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import {
  Box,
  Button,
  Input,
  Heading,
  Text,
  VStack,
  Link,
  Flex,
} from "@chakra-ui/react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser, setCartId } = useUser();
  const navigate = useNavigate();
  const client = useApolloClient();

  const [createCart] = useMutation(CREATE_CART);

  const handleLogin = async () => {
    setError("");

    if (!email.trim()) {
      setError("Please enter your email");
      return;
    }

    setLoading(true);

    try {
      const { data } = await client.query({
        query: GET_USER_BY_EMAIL,
        variables: { email: email.trim() },
        fetchPolicy: "network-only",
      });

      const userData = data?.userByEmail;

      if (!userData) {
        setError("No account found with this email. Please sign up.");
        setLoading(false);
        return;
      }

      setUser({ id: userData.id, name: userData.name, email: userData.email });

      // Fetch cart
      try {
        const cartData = await client.query({
          query: GET_CART,
          variables: { userId: userData.id },
          fetchPolicy: "network-only",
        });

        if (cartData?.data?.cart) {
          setCartId(cartData.data.cart.id);
        } else {
          const newCart = await createCart({ variables: { userId: userData.id } });
          if (newCart?.data?.createCart?.cart) {
            setCartId(newCart.data.createCart.cart.id);
          }
        }
      } catch (cartErr) {
        console.error("Cart setup error:", cartErr);
        try {
          const newCart = await createCart({ variables: { userId: userData.id } });
          if (newCart?.data?.createCart?.cart) {
            setCartId(newCart.data.createCart.cart.id);
          }
        } catch (createErr) {
          console.error("Cart creation error:", createErr);
        }
      }

      setLoading(false);
      navigate("/");
    } catch (err) {
      setLoading(false);
      setError(err.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <Flex minH="100vh" align="center" justify="center">
      <Box
        p={10}
        borderRadius="lg"
        w="full"
        maxW="440px"
        border="1px solid"
        borderColor="gray.200"
      >
        <VStack gap={6} align="stretch">
          <Box textAlign="center">
            <Heading size="2xl" mb={2}>
              Welcome Back
            </Heading>
          </Box>

          {error && (
            <Text color="red.500" fontSize="sm" textAlign="center">
              {error}
            </Text>
          )}

          <Input
            placeholder="Enter your email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            size="lg"
            borderRadius="md"
          />

          <Button
            onClick={handleLogin}
            loading={loading}
            loadingText="Signing in..."
            size="lg"
            colorPalette="blue"
            borderRadius="md"
          >
            Sign In
          </Button>

          <Text textAlign="center" color="gray.500" fontSize="sm">
            Don't have an account?{" "}
            <Link as={RouterLink} to="/signup" color="blue.500">
              Sign Up
            </Link>
          </Text>
        </VStack>
      </Box>
    </Flex>
  );
};

export default LoginPage;
