import { Card as ChakraCard, Text } from '@chakra-ui/react';
import { Button } from '../Button/Button';

// A simple Profile or Product "Card" layout.
// It takes 3 simple props: 
// 1. title
// 2. description (body text)
// 3. buttonText (what the button at the bottom says)
export const Card = ({ title, description, buttonText }) => {
  return (
    <ChakraCard.Root width="320px">
      
      <ChakraCard.Header>
        {/* We use Chakra's "Text" component here to make it bold */}
        <Text fontWeight="bold" fontSize="xl">{title}</Text>
      </ChakraCard.Header>
      
      <ChakraCard.Body>
        <Text>{description}</Text>
      </ChakraCard.Body>
      
      <ChakraCard.Footer>
        {/* Reusing the Button component we built earlier! */}
        <Button label={buttonText} colorPalette="blue" />
      </ChakraCard.Footer>
      
    </ChakraCard.Root>
  );
};
