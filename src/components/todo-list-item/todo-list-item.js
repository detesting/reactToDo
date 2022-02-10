import React, { Component } from 'react';
import './todo-list-item.css';
import PropTypes from 'prop-types';

export default class TodoListItem extends Component {
  render() {
    const { label, onDeleted, onToggleImportant, onToggleDone, important, done, date } = this.props;

    let classNames = 'todo-list-item';
    if (done) {
      classNames += ' done';
    }

    if (important) {
      classNames += ' important';
    }

    return (
      <span className={classNames}>
        <span className="todo-list-item-label" onClick={onToggleDone}>
          {label}
        </span>
        <span className="todo-list-item-date">{date}</span>
        <button type="button" className="btn btn-outline-success btn-sm float-right" onClick={onToggleImportant}>
          <i className="fa fa-exclamation" />
        </button>

        <button type="button" className="btn btn-outline-danger btn-sm float-right" onClick={onDeleted}>
          <i className="fa fa-trash-o" />
        </button>
      </span>
    );
  }
}

TodoListItem.defaultProps = {
  label: '',
  onDeleted: () => {},
  onToggleImportant: () => {},
  onToggleDone: () => {},
  important: false,
  done: false,
  date: new Date(),
};
TodoListItem.propTypes = {
  label: PropTypes.string,
  onDeleted: PropTypes.func,
  onToggleImportant: PropTypes.func,
  onToggleDone: PropTypes.func,
  important: PropTypes.bool,
  done: PropTypes.bool,
  date: PropTypes.string,
};
