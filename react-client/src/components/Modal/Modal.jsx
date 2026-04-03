import { Box, Flex, Text } from '@chakra-ui/react';
import { Button } from '../Button/Button';

// A simple Modal component built from scratch using Box overlays.
// Props:
// 1. isOpen: Boolean. If true, the modal renders. If false, we render absolutely nothing!
// 2. title: the header text.
// 3. content: the main message.
// 4. onClose: a function we attach to the close button so it knows what to do.
export const Modal = ({ isOpen, title, content, onClose }) => {
  // The magic trick to "hide" the modal: just return null to React.
  if (!isOpen) {
    return null;
  }

  return (
    // The "Overlay": A dark, transparent background that covers the whole screen
    <Flex
      position="fixed"
      top="0" bottom="0" left="0" right="0"
      bg="rgba(0,0,0,0.6)"
      justifyContent="center"
      alignItems="center"
      zIndex="1000"
    >
      {/* The actual White Box Content */}
      <Box bg="white" p="6" borderRadius="md" width="400px" boxShadow="lg">
        {/* I saw you added color="black" manually before, which is great for readability! */}
        <Text fontWeight="bold" fontSize="xl" mb="4" color="black">{title}</Text>
        <Text mb="6" color="black">{content}</Text>
        
        {/* We use our Button again! When clicked, it fires the onClose function passed from outside */}
        <Button label="Close" colorPalette="gray" onClick={onClose} />
      </Box>
    </Flex>
  );
};
