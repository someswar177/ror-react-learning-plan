import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { Link } from "react-router-dom";
import { Box, Text, VStack } from "@chakra-ui/react";

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
    }
  }
`;

export default function UserList() {
  const { data, loading, error } = useQuery(GET_USERS);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text color="red.500">Error: {error.message}</Text>;

  return (
    <VStack align="stretch" gap={3}>
      {data.users.map((user) => (
        <Box key={user.id} p={4} borderWidth="1px" borderRadius="lg">
          <Link to={`/user/${user.id}`}>
            <Text fontWeight="bold">{user.name}</Text>
          </Link>
        </Box>
      ))}
    </VStack>
  );
}
