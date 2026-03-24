import { useState } from "react";
import { gql } from "@apollo/client";
import { useApolloClient } from "@apollo/client/react";
import { Input, Button, HStack, Text } from "@chakra-ui/react";

const CREATE_COMMENT = gql`
  mutation CreateComment($body: String!, $userId: ID!, $postId: ID!) {
    createComment(input: { body: $body, userId: $userId, postId: $postId }) {
      comment {
        id
        body
      }
      errors
    }
  }
`;

export default function CommentForm({ postId, userId, onAdded }) {
  const client = useApolloClient();
  const [body, setBody] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(null);

  async function handleAdd() {
    setErr(null);
    setBusy(true);
    try {
      const { data } = await client.mutate({
        mutation: CREATE_COMMENT,
        variables: { body, userId, postId },
      });
      const errors = data?.createComment?.errors;
      if (errors?.length) {
        setErr(errors.join(", "));
        return;
      }
      setBody("");
      onAdded?.();
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <HStack mt={2}>
        <Input
          placeholder="Add comment"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <Button size="sm" loading={busy} onClick={handleAdd}>
          Add
        </Button>
      </HStack>
      {err && (
        <Text fontSize="sm" color="red.500" mt={1}>
          {err}
        </Text>
      )}
    </>
  );
}
