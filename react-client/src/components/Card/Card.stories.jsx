import { Card } from './Card';

export default {
  title: 'Components/Card',
  component: Card,
};

// Story 1: A user profile card
export const ProfileCard = {
  args: {
    title: 'Someswar',
    description: 'A frontend developer passionate about React and UI building.',
    buttonText: 'View Profile',
  },
};

// Story 2: A product sale card
export const ProductCard = {
  args: {
    title: 'Mechanical Keyboard',
    description: 'High-quality mechanical keyboard with cherry MX red switches.',
    buttonText: 'Add to Cart',
  },
};
