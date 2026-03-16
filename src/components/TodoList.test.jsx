import { render, screen } from '@testing-library/react';
import TodoList from './TodoList';
import React from 'react';
import userEvent from '@testing-library/user-event';

test('renders todo input field', () => {
    render(<TodoList />);

    const input = screen.getByPlaceholderText('Add a todo');

    expect(input).toBeInTheDocument();
})

test('add a todo item', async () => {
    render(<TodoList />);

    const input = screen.getByPlaceholderText('Add a todo');

    await userEvent.type(input, 'Learn React Testing Library');

    expect(input).toHaveValue('Learn React Testing Library');
})

test('adds todo item to list when button clicked', async () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText('Add a todo');
    const button = screen.getByRole('button', { name: /add/i });

    await userEvent.type(input, 'Learn React Testing Library');
    await userEvent.click(button);

    expect(screen.getByText('Learn React Testing Library')).toBeInTheDocument();
})

test('calls callback when button clicked', async () => {
    const handleClick = jest.fn();

    render(<button onClick={handleClick}>Click</button>);

    await userEvent.click(screen.getByText("Click"));

    expect(handleClick).toHaveBeenCalled();
})
