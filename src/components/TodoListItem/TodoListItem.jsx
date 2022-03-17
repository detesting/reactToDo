import React, { useEffect, useState } from 'react';
import './TodoListItem.css';
import PropTypes from 'prop-types';

export default function TodoListItem({
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
}) {
  const [value, setValue] = useState(label);
  const [secItem, setSec] = useState(sec);
  const [minItem, setMin] = useState(min);
  const [status, setStatus] = useState('pause');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  let classNames = 'todo-list-item';
  if (done) {
    classNames += ' done';
  }

  if (important) {
    classNames += ' important';
  }

  const onPlay = () => {
    if (status === 'play'){
      setMin(secItem > 0 ? minItem : minItem === 0 ? 0 : minItem - 1);
      setSec(secItem > 0 ? secItem - 1 : minItem === 0 ? 0 : 59);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      onPlay();
    }, 1000);
    return () => clearInterval(interval);
  });

  return (
    <span className={classNames}>
      {edit ? (
        <form onSubmit={(e) => editingItem(e, value)} className='item-edit-form'>
          <label htmlFor='editInput' />
          <input
            type='text'
            value={value}
            onChange={handleChange}
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
          <div>
            <span className='todo-list-item-label' onClick={onToggleDone}>
              {label}
            </span>
            <span className='todo-list-item-label' onClick={onToggleDone}>
              {minItem + ':' + secItem}
            </span>
            <button type='button' className='btn btn-light btn-sm' onClick={() => setStatus('play')} title='Play'>
              <i className='fa fa-play' />
            </button>
            <button type='button' className='btn btn-light btn-sm' onClick={() => setStatus('pause')} title='Pause'>
              <i className='fa fa-pause' />
            </button>
            <span className='todo-list-item-date'>{date}</span>
          </div>
          <div>
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
        </div>
      )}
    </span>
  );
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
