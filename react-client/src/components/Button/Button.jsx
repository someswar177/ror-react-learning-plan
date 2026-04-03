import { Button as ChakraButton } from '@chakra-ui/react';

// Keeping it very simple!
// We need to make sure we accept "onClick" so Buttons can actually be clicked!
export const Button = ({ label, colorPalette, onClick }) => {
  return (
    <ChakraButton colorPalette={colorPalette} onClick={onClick}>
      {label}
    </ChakraButton>
  );
};
