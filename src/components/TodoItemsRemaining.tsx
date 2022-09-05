import React from 'react';
import PropTypes from 'prop-types';

TodoItemsRemaining.propTypes = {
  remaining: PropTypes.number.isRequired,
};

interface Remaining {
  remaining: number;
}

function TodoItemsRemaining(props: Remaining) {
  return <span>{props.remaining} items remaining</span>;
}

export default TodoItemsRemaining;
