import React, { useState } from 'react';
import PropTypes from 'prop-types';

TodoForm.propTypes = {
  addTodo: PropTypes.func.isRequired,
};

interface AddTodo {
  addTodo(todo: string): void;
}

function TodoForm(props: AddTodo) {
  const [todoInput, setTodoInput] = useState('');

  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    setTodoInput(event.target.value);
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (todoInput.trim().length === 0) {
      return;
    }

    props.addTodo(todoInput);

    setTodoInput('');
  }

  return (
    <form action="#" onSubmit={handleSubmit}>
      <input
        type="text"
        value={todoInput}
        onChange={handleInput}
        className="todo-input"
        placeholder="What do you need to do?"
      />
    </form>
  );
}

export default TodoForm;
