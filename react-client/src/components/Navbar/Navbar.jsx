import { Flex, Box, Text } from '@chakra-ui/react';
import { Button } from '../Button/Button';

// A simple Navigation Bar component.
// It takes 2 props:
// 1. logoText (string)
// 2. isLoggedIn (boolean - true/false)
export const Navbar = ({ logoText, isLoggedIn }) => {
  return (
    <Flex
      as="nav"
      padding="1rem 2rem"
      bg="gray.100"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box>
        <Text fontWeight="bold" fontSize="2xl" color="black">{logoText}</Text>
      </Box>

      <Box>
        {/* Conditional Rendering! 
            If isLoggedIn is true => show red Logout button.
            If isLoggedIn is false => show blue Login button. */}
        {isLoggedIn ? (
          <Button label="Logout" colorPalette="red" />
        ) : (
          <Button label="Login" colorPalette="blue" />
        )}
      </Box>
    </Flex>
  );
};
