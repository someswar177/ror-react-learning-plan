import { Button, HStack } from "@chakra-ui/react"
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_USERS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  console.log(data);

  return (
    <>
    <HStack>
      <Button>Click me</Button>
      <Button>Click me</Button>
    </HStack>
    </>
  )
}

export default App
