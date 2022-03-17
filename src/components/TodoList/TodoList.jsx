import React from 'react';
import PropTypes from 'prop-types';

import TodoListItem from '../TodoListItem';

import './TodoList.css';

export default function TodoList({
  todos,
  onDeleted,
  onToggleImportant,
  onToggleDone,
  onEdit,
  editingItem,
}) {
  const elements = todos.map((item) => {
    const { id, visible, label, important, done, date, edit, ...itemProps } = item;
    if (visible) {
      return (
        <li key={id} className="list-group-item">
          <TodoListItem
            label={label}
            important={important}
            done={done}
            date={date}
            edit={edit}
            {...itemProps}
            onDeleted={() => onDeleted(id)}
            onToggleImportant={() => onToggleImportant(id)}
            onToggleDone={() => onToggleDone(id)}
            onEdit={() => onEdit(id)}
            editingItem={(e, value) => editingItem(id, value, e)}
          />
        </li>
      );
    } else {
      return null;
    }
  });

  return <ul className="list-group todo-list">{elements}</ul>;
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
