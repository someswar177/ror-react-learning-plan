import { useState } from 'react'
import { Container, Heading, Theme } from '@chakra-ui/react';
import TodoList from './components/TodoList';
import TodoProvider from './components/TodoContext';


function App() {
  return (
    <Theme appearance='light'>
      <TodoProvider>
        <Container centerContent minH="100vh" minW="220px" px={{ base: 4, md: 8 }}>
          <Heading p={5} m={5} fontSize={{ base: "2xl", md: "4xl" }}>Todo App</Heading>
          <TodoList />
        </Container>
      </TodoProvider>
    </Theme>
  );
}

export default App
