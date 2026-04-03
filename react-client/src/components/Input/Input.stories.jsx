import { Input } from './Input';

export default {
  title: 'Forms/Input',
  component: Input,
};

// Story 1: A well-labeled required input
export const LabeledEmailInput = {
  args: {
    id: 'email_field', // Matches Label
    labelText: 'Email Address',
    placeholder: 'e.g. name@example.com',
    type: 'email',
    isRequired: true,
  },
};

// Story 2: Showing an Error State
export const ErrorInput = {
  args: {
    id: 'username_field',
    labelText: 'Username',
    type: 'text',
    isInvalid: true, // Screen readers will warn the user about this!
  },
};
