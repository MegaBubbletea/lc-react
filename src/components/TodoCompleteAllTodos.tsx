import React from 'react';
import PropTypes from 'prop-types';

TodoCompleteAllTodos.propTypes = {
  completeAllTodos: PropTypes.func.isRequired,
};

interface CompleteAll {
  completeAllTodos: React.MouseEventHandler;
}

function TodoCompleteAllTodos(props: CompleteAll) {
  return (
    <div>
      <div onClick={props.completeAllTodos} className="button">
        Check All
      </div>
    </div>
  );
}

export default TodoCompleteAllTodos;
