import React from 'react'
import { createContext, useContext, useReducer } from "react";

const TodoContext = createContext();

const todoReducer = (state, action)=>{
    switch(action.type){
        case "ADD_TODO":
            return {
                todos: [action.payload, ...state.todos]
            }
        default: return state;
    }
}

const TodoProvider = ({ children }) => {
    const [state, dispatch] = useReducer(todoReducer,{
        todos: []
    });
  return (
    <TodoContext.Provider value={{ state, dispatch }}>
        {children}
    </TodoContext.Provider>
  )
}

export const useTodoContext = () => {
    return useContext(TodoContext);
}

export default TodoProvider;