import { Modal } from './Modal';
import { Button } from '../Button/Button';
import { useState } from 'react';

export default {
  title: 'Components/Modal',
  component: Modal,
};

// Story 1: What it looks like when we force it open
export const AlwaysOpen = {
  args: {
    isOpen: true,
    title: 'Hello there!',
    content: 'This is the body of the modal. Try changing me in the controls.',
  },
};

// Story 2: Showing how it works in a REAL app using React State (useState)
export const Interactive = {
  render: () => {
    // We create a variable 'open' that starts as false. 
    // We use 'setOpen' to change it to true/false.
    const [open, setOpen] = useState(false);

    return (
      <div>
        {/* Clicking this button sets 'open' to true */}
        <Button label="Open Modal" colorPalette="blue" onClick={() => setOpen(true)} />

        {/* We pass our 'open' variable into the Modal */}
        <Modal 
          isOpen={open} 
          title="Interactive Modal!"
          content="You opened me. Now click the Close button to trigger onClose and hide me."
          // We pass the function to set 'open' back to false!
          onClose={() => setOpen(false)} 
        />
      </div>
    );
  }
};
