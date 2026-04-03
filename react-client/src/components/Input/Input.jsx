import { Input as ChakraInput, Box, Text } from '@chakra-ui/react';

// Upgraded Input component for Accessibility!
// Added: labelText, id, isInvalid, and isRequired.
export const Input = ({ labelText, id, placeholder, type, isInvalid, isRequired }) => {
  return (
    <Box>
      {/* 
        This is the magic A11y linkage! 
        1. We render a visual <Text as="label">.
        2. We use htmlFor={id} so Screen Readers know this text belongs to the input below.
      */}
      {labelText && (
        <Text as="label" htmlFor={id} fontWeight="bold" display="block" mb="1" color="black">
          {labelText} {isRequired && <Text as="span" color="red.500">*</Text>}
        </Text>
      )}

      {/* The Input itself */}
      <ChakraInput
        id={id} // MUST exactly match the htmlFor on the label!
        placeholder={placeholder}
        type={type}

        // ARIA attributes for Screen Readers
        aria-invalid={isInvalid}
        aria-required={isRequired}
      />
    </Box>
  );
};
