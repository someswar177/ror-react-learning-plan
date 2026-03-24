import { useState } from "react";
import { gql } from "@apollo/client";
import { useApolloClient } from "@apollo/client/react";
import { Input, Button, VStack, Textarea, Text } from "@chakra-ui/react";

const CREATE_POST = gql`
  mutation CreatePost($title: String!, $body: String!, $userId: ID!) {
    createPost(input: { title: $title, body: $body, userId: $userId }) {
      post {
        id
        title
        body
      }
      errors
    }
  }
`;

export default function PostForm({ userId, onAdded }) {
  const client = useApolloClient();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(null);

  async function handleAdd() {
    setErr(null);
    setBusy(true);
    try {
      const { data } = await client.mutate({
        mutation: CREATE_POST,
        variables: { title, body, userId },
      });
      const errors = data?.createPost?.errors;
      if (errors?.length) {
        setErr(errors.join(", "));
        return;
      }
      setTitle("");
      setBody("");
      onAdded?.();
    } finally {
      setBusy(false);
    }
  }

  return (
    <VStack align="stretch" gap={2}>
      <Input
        placeholder="Post title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Textarea
        placeholder="Post body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={4}
      />
      <Button loading={busy} onClick={handleAdd} alignSelf="flex-start">
        Add Post
      </Button>
      {err && (
        <Text fontSize="sm" color="red.500">
          {err}
        </Text>
      )}
    </VStack>
  );
}
