import { useState } from "react";
import { useApolloClient, useMutation } from "@apollo/client/react";
import { CREATE_USER, CREATE_CART } from "../operations/mutations/userMutations";
import { GET_USER_BY_EMAIL } from "../operations/queries/userQueries";
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

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const { setUser, setCartId } = useUser();
  const navigate = useNavigate();
  const client = useApolloClient();

  const [createUser, { loading: creatingUser }] = useMutation(CREATE_USER);
  const [createCart] = useMutation(CREATE_CART);

  const handleSignup = async () => {
    setError("");

    if (!name.trim() || !email.trim()) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const { data: existingData } = await client.query({
        query: GET_USER_BY_EMAIL,
        variables: { email: email.trim() },
        fetchPolicy: "network-only",
      });
      if (existingData?.userByEmail) {
        setError("Email already registered. Please login instead.");
        return;
      }

      const { data } = await createUser({
        variables: { name: name.trim(), email: email.trim() },
      });

      if (data?.createUser?.errors?.length > 0) {
        setError(data.createUser.errors.join(", "));
        return;
      }

      const newUser = data.createUser.user;
      setUser({ id: newUser.id, name: newUser.name, email: newUser.email });

      const cartResult = await createCart({ variables: { userId: newUser.id } });
      if (cartResult.data?.createCart?.cart) {
        setCartId(cartResult.data.createCart.cart.id);
      }

      navigate("/");
    } catch (err) {
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
              Create Account
            </Heading>
          </Box>

          {error && (
            <Text color="red.500" fontSize="sm" textAlign="center">
              {error}
            </Text>
          )}

          <Input
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            size="lg"
            borderRadius="md"
          />

          <Input
            placeholder="Your email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSignup()}
            size="lg"
            borderRadius="md"
          />

          <Button
            onClick={handleSignup}
            loading={creatingUser}
            loadingText="Creating account..."
            size="lg"
            colorPalette="blue"
            borderRadius="md"
          >
            Sign Up
          </Button>

          <Text textAlign="center" color="gray.500" fontSize="sm">
            Already have an account?{" "}
            <Link as={RouterLink} to="/login" color="blue.500">
              Sign In
            </Link>
          </Text>
        </VStack>
      </Box>
    </Flex>
  );
};

export default SignupPage;
