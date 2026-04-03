import React, { forwardRef } from 'react';
import { Button as ChakraButton } from '@chakra-ui/react';

// Keeping it very simple!
// We now explicitly use "forwardRef". This allows parent components (like our Modal)
// to "grab" this button using a reference, which is required for Focus Management!
export const Button = forwardRef(({ label, colorPalette, onClick, ariaLabel }, ref) => {
  return (
    // We explicitly attach the aria-label so screen readers can describe the button accurately.
    // We pass the new "ref" directly into the ChakraButton.
    <ChakraButton ref={ref} colorPalette={colorPalette} onClick={onClick} aria-label={ariaLabel}>
      {label}
    </ChakraButton>
  );
});
