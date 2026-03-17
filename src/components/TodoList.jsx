import React,{useState} from 'react'
import { Box } from "@chakra-ui/react"
import TodoForm from './TodoForm';
import TodoCard from './TodoCard';

const TodoList = () => {
    const [todo,setTodo] = useState([]);
    function addTodo(newTodo){
        setTodo([...todo,newTodo])
    }
    return (
        <Box maxW={{ base: "100%", md: "600px" }} w="full">
            <TodoForm onAddTodo={addTodo} />
            {todo.slice().reverse().map((item,index)=>{
                return <TodoCard key={index} todo={item} />
            })}                        
        </Box>
    )
}

export default TodoList