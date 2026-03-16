import { useState } from "react";
import React from "react";

function TodoList() {
  const [todo, setTodo] = useState("");

  return (
    <div>
      <input
        placeholder="Add a todo"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
    </div>
  );
}

export default TodoList;