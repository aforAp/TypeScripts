import { useState } from "react";
import NewTodo from "./components/NewTodo";
import Todos from "./components/Todos";
import Todo from "./models/todos";
const App = () => {
const [todos, setTodos] = useState<Todo[]>([]);

const addTodoHandler = (todoText: string) => {
  const newTodo = new Todo(todoText);
  setTodos((prevState) => {
    return prevState.concat(newTodo)});
}

const removeTodoHandler = (todoId: string) => {
  setTodos((prevTodos) => {
    return prevTodos.filter(todos => todos.id !== todoId);
  })
};

  return (
    <div>
      <NewTodo onAddTodo={addTodoHandler}/>
      <Todos items={todos} onRemoveTodo={removeTodoHandler}/>
    </div>
  )
}

export default App;