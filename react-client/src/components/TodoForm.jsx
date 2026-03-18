import { Button, HStack, Input } from '@chakra-ui/react'
import { useTodoContext } from './TodoContext';
import React from 'react'

const TodoForm = () => {
    const [newTodo,setNewTodo] = React.useState("");
    const { dispatch } = useTodoContext();
    
    function handleSubmit(e){
        e.preventDefault();
        if(newTodo.trim() === "") return;
        dispatch({
            type: "ADD_TODO", 
            payload: newTodo
        });
        setNewTodo("");
    }
  return (
    <form onSubmit={(e)=>handleSubmit(e)}>
        <HStack my={2} spacing={{ base: 2, md: 4 }}>
            <Input 
            placeholder='Add a new todo' 
            value={newTodo} 
            onChange={(e)=>setNewTodo(e.target.value)} 
            flex={1} 
            />
            
            <Button type='submit' colorScheme='teal' size={{ base: "sm", md: "md" }}>Add</Button>
        </HStack>
    </form>
  )
}

export default TodoForm