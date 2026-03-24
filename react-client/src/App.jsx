import { BrowserRouter, Routes, Route, Link as RouterLink } from 'react-router-dom';
import { Box, Flex, Link } from '@chakra-ui/react';
import Home from "./pages/Home.jsx";
import UserPage from "./pages/UserPage.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Box minH="100vh">
        <Flex as="header" px={6} py={3} borderBottomWidth="1px" gap={4} align="center">
          <Link asChild fontWeight="semibold">
            <RouterLink to="/">Users</RouterLink>
          </Link>
        </Flex>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/:id" element={<UserPage />} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
}
