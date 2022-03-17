import React from 'react';
import './AppHeader.css';
import PropTypes from 'prop-types';

export default function AppHeader({ done }) {
  return (
    <div className='app-header d-flex'>
      <h1>Todo List</h1>
      <h2> {done} done</h2>
    </div>
  );
}

AppHeader.defaultProps = {
  done: 0,
};
AppHeader.propTypes = {
  done: PropTypes.number,
};
