import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import PostForm from "./PostForm.jsx";
import CommentForm from "./CommentForm.jsx";

const USER_WITH_POSTS = gql`
  query GetUserWithPosts($id: ID!) {
    user(id: $id) {
      id
      name
      email
      posts {
        id
        title
        body
        comments {
          id
          body
        }
      }
    }
  }
`;

export default function UserDetails({ userId }) {
  const { data, loading, error, refetch } = useQuery(USER_WITH_POSTS, {
    variables: { id: userId },
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text color="red.500">Error: {error.message}</Text>;

  const user = data?.user;
  if (!user) return <Text>User not found.</Text>;

  return (
    <VStack align="stretch" gap={6}>
      <Heading>{user.name}</Heading>
      <Text fontSize="sm" color="fg.muted">
        {user.email}
      </Text>

      <PostForm userId={user.id} onAdded={() => refetch()} />

      {user.posts.map((post) => (
        <Box key={post.id} p={4} borderWidth="1px" borderRadius="lg">
          <Text fontWeight="bold">{post.title}</Text>
          {post.body && (
            <Text fontSize="sm" mt={2} whiteSpace="pre-wrap">
              {post.body}
            </Text>
          )}

          <CommentForm
            postId={post.id}
            userId={user.id}
            onAdded={() => refetch()}
          />

          <VStack align="stretch" mt={2} gap={1}>
            {post.comments.map((c) => (
              <Text key={c.id} fontSize="sm">
                • {c.body}
              </Text>
            ))}
          </VStack>
        </Box>
      ))}
    </VStack>
  );
}
