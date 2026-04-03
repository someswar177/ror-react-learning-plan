import { Button } from './Button';

// Metadata and configuration for the Button component in Storybook
export default {
  title: 'Forms/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['solid', 'outline', 'ghost', 'subtle', 'surface'] },
    colorPalette: { control: 'select', options: ['blue', 'red', 'green', 'teal', 'purple'] },
    size: { control: 'radio', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    disabled: { control: 'boolean' },
    onClick: { action: 'clicked' }
  },
};

// Default setup for a primary/solid button
export const Solid = {
  args: {
    variant: 'solid',
    colorPalette: 'blue',
    label: 'Solid Button',
    size: 'md',
  },
};

// Setup for an outline button
export const Outline = {
  args: {
    variant: 'outline',
    colorPalette: 'teal',
    label: 'Outline Button',
    size: 'md',
  },
};

// Setup for a disabled button
export const Disabled = {
  args: {
    variant: 'solid',
    colorPalette: 'blue',
    label: 'Disabled Button',
    disabled: true,
  },
};
