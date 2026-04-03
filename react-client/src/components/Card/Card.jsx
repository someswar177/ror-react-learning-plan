import { Card as ChakraCard, Text } from '@chakra-ui/react';
import { Button } from '../Button/Button';

// A simple Profile or Product "Card" layout.
// It takes 3 simple props: 
// 1. title
// 2. description (body text)
// 3. buttonText (what the button at the bottom says)
export const Card = ({ title, description, buttonText }) => {
  return (
    <ChakraCard.Root width="320px" as="article" aria-labelledby="card-title">
      
      <ChakraCard.Header>
        {/* Semantic A11y: 'as="h2"' makes it a true heading for screen readers, not just large text! */}
        <Text id="card-title" as="h2" fontWeight="bold" fontSize="xl">{title}</Text>
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
