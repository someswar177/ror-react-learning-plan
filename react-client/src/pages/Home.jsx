import { Box, Heading, VStack } from '@chakra-ui/react';
import UserList from '../components/UserList';
import UserForm from '../components/UserForm';

export default function Home() {
  return (
    <Box p={6}>
      <Heading mb={4}>Users</Heading>
      <VStack gap={6} align="stretch">
        <UserForm />
        <UserList />
      </VStack>
    </Box>
  );
}