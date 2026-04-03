import { Box, Flex, Text } from '@chakra-ui/react';
import { Button } from '../Button/Button';
import { useEffect } from 'react';

// A simple Modal component built from scratch using Box overlays.
// Props:
// 1. isOpen: Boolean. If true, the modal renders. If false, we render absolutely nothing!
// 2. title: the header text.
// 3. content: the main message.
// 4. onClose: a function we attach to the close button so it knows what to do.
export const Modal = ({ isOpen, title, content, onClose }) => {
  // A11y Feature: Keyboard Navigation!
  // If the Modal is open, we listen for the "Escape" key to close it.
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && onClose) {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    
    // Cleanup the event listener when the modal closes or is unmounted!
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

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
      <Box 
        bg="white" p="6" borderRadius="md" width="400px" boxShadow="lg"
        // --- A11y ARIA Attributes ---
        role="dialog" 
        aria-modal="true" // Tells screen readers the rest of the page is blocked
        aria-labelledby="modal-title" // Maps the dialog's name to the title Text
        aria-describedby="modal-desc" // Maps the dialog's description to the content Text
      >
        {/* We give these Texts specific IDs so ARIA can map to them! */}
        <Text id="modal-title" fontWeight="bold" fontSize="xl" mb="4" color="black">{title}</Text>
        <Text id="modal-desc" mb="6" color="black">{content}</Text>
        
        {/* We use our Button again! When clicked, it fires the onClose function passed from outside */}
        <Button label="Close" colorPalette="gray" onClick={onClose} />
      </Box>
    </Flex>
  );
};
