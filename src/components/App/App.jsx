import React, { useState } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import AppHeader from '../AppHeader';
import TodoList from '../TodoList';
import ItemStatusFilter from '../ItemStatusFilter';
import ItemAddForm from '../ItemAddForm';
import { Footer } from '../AppFooter';

import './App.css';

export default function App() {
  let maxId = 100;

  const [todoData, setTodoData] = useState([{
    label: 'Drink Coffee',
    important: false,
    done: false,
    id: 100,
    visible: true,
    date: formatDistanceToNow(Date.parse('2021-12-02T22:00:00'), { addSuffix: true }),
    edit: false,
    min: 4,
    sec: 7,
    play: null,
  }, {
    label: 'Make Awesome App',
    important: false,
    done: false,
    id: 101,
    visible: true,
    date: formatDistanceToNow(Date.parse('2020-12-02T12:00:00'), { addSuffix: true }),
    edit: false,
    min: 2,
    sec: 10,
    play: null,
  }, {
    label: 'Have a lunch',
    important: false,
    done: false,
    id: 102,
    visible: true,
    date: formatDistanceToNow(Date.parse('2021-06-02T00:00:00'), { addSuffix: true }),
    edit: false,
    min: 0,
    sec: 36,
    play: null,
  }]);

  const createTodoItem = (label, date, min, sec) => {
    if (todoData.length) {
      maxId = todoData[todoData.length - 1].id + 1;
    }
    return {
      label,
      important: false,
      done: false,
      id: maxId++,
      visible: true,
      date: formatDistanceToNow(Date.parse(date), { addSuffix: true }),
      edit: false,
      min: min,
      sec: sec,
      play: null,
    };
  };
  const [filter, setFilter] = useState('all');

  const deleteItem = (id) => {
    let todos = todoData;
    const idx = todos.findIndex((el) => el.id === id);

    const newArray = [...todos.slice(0, idx), ...todos.slice(idx + 1)];

    setTodoData(newArray);
  };

  const addItem = (text, min, sec) => {
    if (!min) {
      min = 0;
    }
    if (!sec) {
      sec = 0;
    }
    const newItem = createTodoItem(text, new Date(), min, sec);
    const newArr = [...todoData, newItem];
    setTodoData(newArr);
  };

  const toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex((el) => el.id === id);

    const oldItem = arr[idx];
    const newItem = {
      ...oldItem,
      [propName]: !oldItem[propName],
    };

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  };

  const onToggleDone = (id) => {
    setTodoData(toggleProperty(todoData, id, 'done'));
  };

  const onToggleImportant = (id) => {
    setTodoData(toggleProperty(todoData, id, 'important'));
  };

  const setVisible = () => {
    const arr = todoData.map((item) => {
      item.visible = true;
      return item;
    });
    setTodoData([...arr]);
  };

  const onDone = () => {
    const arr = todoData.map((item) => {
      if (!item.done) {
        item.visible = false;
      }
      return item;
    });
    setTodoData([...arr]);
  };

  const onActive = () => {
    const arr = todoData.map((item) => {
      if (item.done) {
        item.visible = false;
      }
      return item;
    });
    setTodoData([...arr]);
  };

  const onEdit = (id) => {
    setTodoData(toggleProperty(todoData, id, 'edit'));
  };

  const editingItem = (id, value, e) => {
    e.preventDefault();

    const arr = todoData.map((item) => {
      if (item.id === id) {
        item.label = value;
        item.date = formatDistanceToNow(new Date(), { addSuffix: true });
      }
      return item;
    });
    setTodoData(arr);
    onEdit(id);
  };

  const onFilterChange = (filter) => {
    setFilter(filter);
    setVisible();
    filter === 'done' ? onDone() : filter === 'active' ? onActive() : setVisible();
  };

  const onClearCompleted = () => {
    let arr = todoData.filter((item) => {
      return !item.done;
    });
    setTodoData([...arr]);
  };

  const doneCount = todoData.filter((el) => el.done).length;
  const todoCount = todoData.length - doneCount;

  return (
    <div className='todo-app'>
      <AppHeader done={doneCount} />
      <div className='top-panel d-flex'>
        <ItemStatusFilter filter={filter} onFilterChange={onFilterChange} />
      </div>

      <TodoList
        todos={todoData}
        onDeleted={deleteItem}
        onToggleImportant={onToggleImportant}
        onToggleDone={onToggleDone}
        onEdit={onEdit}
        editingItem={editingItem}
      />

      <ItemAddForm onItemAdded={addItem} />
      <Footer toDo={todoCount} onClearCompleted={onClearCompleted} />
    </div>
  );
}
