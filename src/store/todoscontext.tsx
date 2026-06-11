import { createContext, useState, type ReactNode } from "react";
import Todo from "../models/todos";

type TodoContextObj = {
    items: Todo[];
    addTodo: (text: string) => void;
    removeTodo: (id: string) => void;
    children: ReactNode
};
const TodosContext = createContext<TodoContextObj>({
    items: [],
    addTodo: () => {},
    removeTodo: (id: string) => {}
});

export const TodosContextProvider: React.FC = (props) => {
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

const contextValue: TodoContextObj = {
    items: todos,
    addTodo: addTodoHandler,
    removeTodo: removeTodoHandler
};
    return <TodosContext.Provider value={contextValue}>
{props.children}
    </TodosContext.Provider>
};


export default TodosContext;