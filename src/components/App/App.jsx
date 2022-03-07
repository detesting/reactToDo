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
  const createTodoItem = (label, date, min, sec) => {
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

  const [todoData, setTodoData] = useState([
    createTodoItem('Drink Coffee', '2021-12-02T22:00:00', 4, 7),
    createTodoItem('Make Awesome App', '2020-12-02T12:00:00', 0, 35),
    createTodoItem('Have a lunch', '2021-06-02T00:00:00', 1, 48),
  ]);
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
    setTodoData([...todoData, newItem]);
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

  const onPlay = (id) => {
    const arr = todoData.map((item, i) => {
      if (item.id === id) {
        item.play = setInterval(() => {
          item.min = item.sec > 0 ? item.min : item.min === 0 ? 0 : item.min - 1;
          item.sec = item.sec > 0 ? item.sec - 1 : item.min === 0 ? 0 : 59;
          setTodoData([...todoData.slice(0, i), item, ...todoData.slice(i + 1)]);
        }, 1000);
      }
      return item;
    });
    setTodoData(arr);
  };

  const onPause = (id) => {
    const idx = todoData.findIndex((el) => el.id === id);
    const oldItem = todoData[idx];
    clearInterval(oldItem.play);
    const newItem = {
      ...oldItem,
      play: null,
    };
    setTodoData([...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]);
  };

  const doneCount = todoData.filter((el) => el.done).length;
  const todoCount = todoData.length - doneCount;

  return (
    <div className="todo-app">
      <AppHeader done={doneCount} />
      <div className="top-panel d-flex">
        <ItemStatusFilter filter={filter} onFilterChange={onFilterChange} />
      </div>

      <TodoList
        todos={todoData}
        onDeleted={deleteItem}
        onToggleImportant={onToggleImportant}
        onToggleDone={onToggleDone}
        onEdit={onEdit}
        editingItem={editingItem}
        onPlay={onPlay}
        onPause={onPause}
      />

      <ItemAddForm onItemAdded={addItem} />
      <Footer toDo={todoCount} onClearCompleted={onClearCompleted} />
    </div>
  );
}
