import { useParams } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import UserDetails from "../components/UserDetails.jsx";

export default function UserPage() {
  const { id } = useParams();
  return (
    <Box p={6}>
      <UserDetails userId={id} />
    </Box>
  );
}