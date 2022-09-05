import React, { useState } from 'react';
import '../reset.css';
import '../App.css';
import NoTodos from './NoTodos';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

function App() {
  interface Todo {
    id: number;
    title: string;
    isComplete: boolean;
    isEditing: boolean;
  }

  const [todos, setTodos] = useState<Todo[]>([
    {
      id: 1,
      title: 'Finish React Series',
      isComplete: false,
      isEditing: false,
    },
    {
      id: 2,
      title: 'Go Grocery',
      isComplete: true,
      isEditing: false,
    },
    {
      id: 3,
      title: 'Take over world',
      isComplete: false,
      isEditing: false,
    },
  ]);

  const [todoId, setTodoId] = useState(4);

  function addTodo(todo: string) {
    setTodos([
      ...todos,
      {
        id: todoId,
        title: todo,
        isComplete: false,
        isEditing: false,
      },
    ]);

    setTodoId(prevTodoId => prevTodoId + 1);
  }

  function deleteTodo(id: Number) {
    setTodos([...todos].filter(todo => todo.id !== id));
  }

  function completeTodo(id: number) {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }

      return todo;
    });

    setTodos(updatedTodos);
  }

  function markAsEditing(id: number) {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isEditing = true;
      }

      return todo;
    });

    setTodos(updatedTodos);
  }

  function updateTodo(
    event:
      | React.FocusEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLInputElement>,
    id: number
  ) {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        if (event.currentTarget.value.trim().length === 0) {
          todo.isEditing = false;
          return todo;
        }

        todo.title = event.currentTarget.value;
        todo.isEditing = false;
      }

      return todo;
    });

    setTodos(updatedTodos);
  }

  function cancelEdit(id: number) {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isEditing = false;
      }

      return todo;
    });

    setTodos(updatedTodos);
  }

  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>
        <TodoForm addTodo={addTodo} />

        {todos.length > 0 ? (
          <TodoList
            todos={todos}
            completeTodo={completeTodo}
            markAsEditing={markAsEditing}
            updateTodo={updateTodo}
            cancelEdit={cancelEdit}
            deleteTodo={deleteTodo}
          />
        ) : (
          <NoTodos />
        )}
      </div>
    </div>
  );
}

export default App;
