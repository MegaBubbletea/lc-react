import React from 'react';
import PropTypes from 'prop-types';

TodoClearCompleted.propTypes = {
  clearCompleted: PropTypes.func.isRequired,
};

interface ClearCompleted {
  clearCompleted: React.MouseEventHandler;
}

function TodoClearCompleted(props: ClearCompleted) {
  return (
    <button onClick={props.clearCompleted} className="button">
      Clear completed
    </button>
  );
}

export default TodoClearCompleted;
