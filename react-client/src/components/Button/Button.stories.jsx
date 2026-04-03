import { Button } from './Button';

// Basic setup: tells Storybook to put this in "Forms -> Button"
export default {
  title: 'Forms/Button',
  component: Button,
};

// Story 1: A blue button
export const BlueButton = {
  args: {
    label: 'Click Me (Blue)',
    colorPalette: 'blue',
  },
};

// Story 2: A red button
export const RedButton = {
  args: {
    label: 'Danger Zone (Red)',
    colorPalette: 'red',
  },
};
