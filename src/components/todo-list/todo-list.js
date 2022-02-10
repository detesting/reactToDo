import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TodoListItem from '../todo-list-item';

import './todo-list.css';

export default class TodoList extends Component {
  render() {
    const { todos, onDeleted, onToggleImportant, onToggleDone } = this.props;

    const elements = todos.map((item) => {
      const { id, visible, ...itemProps } = item;
      if (visible) {
        return (
          <li key={id} className="list-group-item">
            <TodoListItem
              {...itemProps}
              onDeleted={() => onDeleted(id)}
              onToggleImportant={() => onToggleImportant(id)}
              onToggleDone={() => onToggleDone(id)}
            />
          </li>
        );
      } else {
        return null;
      }
    });

    return <ul className="list-group todo-list">{elements}</ul>;
  }
}

TodoList.defaultProps = {
  todos: [],
  onDeleted: () => {},
  onToggleImportant: () => {},
  onToggleDone: () => {},
};
TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object),
  onDeleted: PropTypes.func,
  onToggleImportant: PropTypes.func,
  onToggleDone: PropTypes.func,
};
