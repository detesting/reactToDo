import React from 'react';
import './AppFooter.css';
import PropTypes from 'prop-types';

export default function AppFooter({ toDo, onClearCompleted }) {
  return (
    <div className='app-footer d-flex'>
      <h2>{toDo} more to do</h2>
      <button className='btn btn-info' type='button' onClick={onClearCompleted}>
        Clear completed
      </button>
    </div>
  );
}

AppFooter.defaultProps = {
  toDo: 0,
  onClearCompleted: () => {
  },
};
AppFooter.propTypes = {
  toDo: PropTypes.number,
  onClearCompleted: PropTypes.func,
};
