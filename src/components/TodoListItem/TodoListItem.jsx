import React, { Component } from 'react';
import './TodoListItem.css';
import PropTypes from 'prop-types';

export default class TodoListItem extends Component {
  state = { value: this.props.label };

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    const {
      label,
      onDeleted,
      onToggleImportant,
      onToggleDone,
      important,
      done,
      date,
      onEdit,
      edit,
      editingItem,
      min,
      sec,
      onPause,
      onPlay,
    } =
      this.props;

    let classNames = 'todo-list-item';
    if (done) {
      classNames += ' done';
    }

    if (important) {
      classNames += ' important';
    }

    return (
      <span className={classNames}>
        {edit ? (
          <form onSubmit={(e) => editingItem(e, this.state.value)} className='item-edit-form'>
            <label htmlFor='editInput' />
            <input
              type='text'
              value={this.state.value}
              onChange={this.handleChange.bind(this)}
              placeholder='Edit todo'
              className='form-control'
              id='editInput'
              autoFocus
            />
            <label htmlFor='submitInput' />
            <input type='submit' value='Сохранить' className='btn btn-outline-secondary' id='submitInput' />
          </form>
        ) : (
          <div>
            <span className='todo-list-item-label' onClick={onToggleDone}>
              {label}
            </span>
            <span className='todo-list-item-label' onClick={onToggleDone}>
              {min + ':' + sec}
            </span>
            <button type='button' className='btn btn-light btn-sm' onClick={onPlay} title='Play'>
              <i className='fa fa-play' />
            </button>
            <button type='button' className='btn btn-light btn-sm' onClick={onPause} title='Pause'>
              <i className='fa fa-pause' />
            </button>
            <span className='todo-list-item-date'>{date}</span>
            <button
              type='button'
              className='btn btn-outline-success btn-sm float-right'
              onClick={onToggleImportant}
              title='Make Important'
            >
              <i className='fa fa-exclamation' />
            </button>
            <button type='button' className='btn btn-outline-warning btn-sm float-right' onClick={onEdit} title='Edit'>
              <i className='fa fa-pencil' />
            </button>
            <button
              type='button'
              className='btn btn-outline-danger btn-sm float-right'
              onClick={onDeleted}
              title='Delete'
            >
              <i className='fa fa-trash-o' />
            </button>
          </div>
        )}
      </span>
    );
  }
}

TodoListItem.defaultProps = {
  label: '',
  onDeleted: () => {
  },
  onToggleImportant: () => {
  },
  onToggleDone: () => {
  },
  important: false,
  done: false,
  date: new Date(),
  timer: [3, 33],
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
