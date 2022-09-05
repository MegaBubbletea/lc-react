import React from 'react';
import PropTypes from 'prop-types';
import TodoList from './TodoList';

TodoItemsRemaining.propTypes = {
  remaining: PropTypes.func.isRequired,
};

interface Remaining {
  remaining(): number;
}

function TodoItemsRemaining(props: Remaining) {
  return <span>{props.remaining()} items remaining</span>;
}

export default TodoItemsRemaining;
