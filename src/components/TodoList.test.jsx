import { render, screen } from '@testing-library/react';
import TodoList from './TodoList';
import React from 'react';

test('renders todo input field', ()=>{
    render(<TodoList />);

    const input = screen.getByPlaceholderText('Add a todo');

    expect(input).toBeInTheDocument();
})