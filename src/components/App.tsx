import React, { useEffect, useMemo, useRef } from 'react';
import '../reset.css';
import '../App.css';
import NoTodos from './NoTodos';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import useLocalStorage from '../hooks/useLocalStorage';

function App() {
  interface Todo {
    id: number;
    title: string;
    isComplete: boolean;
    isEditing: boolean;
  }

  const [name, setName] = useLocalStorage('name', '');
  const nameInputEl = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useLocalStorage('todos', []);
  // const [todos, setTodos] = useState<Todo[]>([
  //   {
  //     id: 1,
  //     title: 'Finish React Series',
  //     isComplete: false,
  //     isEditing: false,
  //   },
  //   {
  //     id: 2,
  //     title: 'Go Grocery',
  //     isComplete: true,
  //     isEditing: false,
  //   },
  //   {
  //     id: 3,
  //     title: 'Take over world',
  //     isComplete: false,
  //     isEditing: false,
  //   },
  // ]);

  // const [todoId, setTodoId] = useState(4);
  const [todoId, setTodoId] = useLocalStorage('todoId', 1);

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

    setTodoId((prevTodoId: number) => prevTodoId + 1);
  }

  function deleteTodo(id: Number) {
    setTodos([...todos].filter(todo => todo.id !== id));
  }

  function completeTodo(id: number) {
    const updatedTodos = todos.map((todo: Todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }

      return todo;
    });

    setTodos(updatedTodos);
  }

  function markAsEditing(id: number) {
    const updatedTodos = todos.map((todo: Todo) => {
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
    const updatedTodos = todos.map((todo: Todo) => {
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
    const updatedTodos = todos.map((todo: Todo) => {
      if (todo.id === id) {
        todo.isEditing = false;
      }

      return todo;
    });

    setTodos(updatedTodos);
  }

  function remainingCalculation() {
    return todos.filter((todo: Todo) => !todo.isComplete).length;
  }

  const remaining = useMemo(remainingCalculation, [todos]);

  function clearCompleted() {
    setTodos([...todos].filter(todo => !todo.isComplete));
  }

  function completeAllTodos() {
    const updatedTodos = todos.map((todo: Todo) => {
      todo.isComplete = true;

      return todo;
    });

    setTodos(updatedTodos);
  }

  function todosFiltered(filter: string) {
    if (filter === 'active') {
      return todos.filter((todo: Todo) => !todo.isComplete);
    }

    if (filter === 'completed') {
      return todos.filter((todo: Todo) => todo.isComplete);
    }

    return todos;
  }

  useEffect(() => {
    // console.log('use effect running');
    nameInputEl.current && nameInputEl.current.focus();

    // setName(JSON.parse(localStorage.getItem('name') as string) ?? '');

    return function cleanup() {
      // console.log('cleaning up');
    };
  }, []);

  function handleNameInput(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
    // localStorage.setItem('name', JSON.stringify(event.target.value));
  }

  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <div className="name-container">
          <h2>What is your name?</h2>
          <form action="#">
            <input
              type="text"
              ref={nameInputEl}
              className="todo-input"
              placeholder="What is your name"
              value={name}
              onChange={handleNameInput}
            />
          </form>
          {name && <p className="name-label">Hello, {name}</p>}
        </div>
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
            remaining={remaining}
            clearCompleted={clearCompleted}
            completeAllTodos={completeAllTodos}
            todosFiltered={todosFiltered}
          />
        ) : (
          <NoTodos />
        )}
      </div>
    </div>
  );
}

export default App;
