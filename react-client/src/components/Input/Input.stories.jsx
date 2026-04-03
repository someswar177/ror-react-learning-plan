import { Input } from './Input';

export default {
  title: 'Forms/Input',
  component: Input,
};

// Story 1: A normal text input
export const DefaultTextInput = {
  args: {
    placeholder: 'Enter your name...',
    type: 'text',
  },
};

// Story 2: A password input (hides what you type)
export const PasswordInput = {
  args: {
    placeholder: 'Enter a secret password...',
    type: 'password',
  },
};
