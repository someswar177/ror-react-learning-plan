import { Navbar } from './Navbar';

export default {
  title: 'Components/Navbar',
  component: Navbar,
};

// Story 1: When the user is NOT logged in
export const LoggedOut = {
  args: {
    logoText: 'MyCoolApp',
    isLoggedIn: false,
  },
};

// Story 2: When the user IS logged in
export const LoggedIn = {
  args: {
    logoText: 'MyCoolApp',
    isLoggedIn: true,
  },
};
