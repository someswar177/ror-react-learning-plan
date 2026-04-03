import { Button as ChakraButton } from '@chakra-ui/react';

// Keeping it very simple!
// We now accept "ariaLabel"!
export const Button = ({ label, colorPalette, onClick, ariaLabel }) => {
  return (
    // We explicitly attach the aria-label so screen readers can describe the button accurately.
    <ChakraButton colorPalette={colorPalette} onClick={onClick} aria-label={ariaLabel}>
      {label}
    </ChakraButton>
  );
};
