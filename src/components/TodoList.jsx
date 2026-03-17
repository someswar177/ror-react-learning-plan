import React,{useState} from 'react'
import { Box } from "@chakra-ui/react"
import TodoForm from './TodoForm';
import TodoCard from './TodoCard';
import { useTodoContext } from './TodoContext';

const TodoList = () => {
    const { state } = useTodoContext();
    const { todos } = state;
    return (
        <Box maxW={{ base: "100%", md: "600px" }} w="full">
            <TodoForm />
            {todos.map((item,index)=>{
                return <TodoCard key={index} todo={item} />
            })}                        
        </Box>
    )
}

export default TodoList