import { render } from '@testing-library/react';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { MemoryRouter } from 'react-router-dom';
import { UserProvider } from '../context/UserContext';

const AllTheProviders = ({ children }) => {
    return (
        <ChakraProvider value={defaultSystem}>
            <MemoryRouter>
                <UserProvider>
                    {children}
                </UserProvider>
            </MemoryRouter>
        </ChakraProvider>
    );
};

const customRender = (ui, options) =>
    render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
