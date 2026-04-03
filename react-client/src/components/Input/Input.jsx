import { Input as ChakraInput } from '@chakra-ui/react';

// Very simple Input component!
// We only take two props: 
// 1. "placeholder" (the gray ghost text before you type)
// 2. "type" (whether it's plain text, a password, number, etc.)
export const Input = ({ placeholder, type }) => {
  return (
    <ChakraInput placeholder={placeholder} type={type} />
  );
};
