import { useState } from "react";
import { gql } from "@apollo/client";
import { useApolloClient } from "@apollo/client/react";
import { Input, Button, HStack, VStack, Text } from "@chakra-ui/react";

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
    }
  }
`;

const CREATE_USER = gql`
  mutation CreateUser($name: String!, $email: String!) {
    createUser(input: { name: $name, email: $email }) {
      user {
        id
        name
        email
      }
      errors
    }
  }
`;

export default function UserForm() {
  const client = useApolloClient();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(null);

  async function handleAdd() {
    setErr(null);
    setBusy(true);
    try {
      const { data } = await client.mutate({
        mutation: CREATE_USER,
        variables: { name, email },
        refetchQueries: [{ query: GET_USERS }],
      });
      const errors = data?.createUser?.errors;
      if (errors?.length) {
        setErr(errors.join(", "));
        return;
      }
      setName("");
      setEmail("");
    } finally {
      setBusy(false);
    }
  }

  return (
    <VStack align="stretch" gap={2}>
      <HStack flexWrap="wrap">
        <Input
          placeholder="Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button loading={busy} onClick={handleAdd}>
          Add
        </Button>
      </HStack>
      {err && (
        <Text fontSize="sm" color="red.500">
          {err}
        </Text>
      )}
    </VStack>
  );
}
