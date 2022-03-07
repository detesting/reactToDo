import React, { Component } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import AppHeader from '../AppHeader';
import TodoList from '../TodoList';
import ItemStatusFilter from '../ItemStatusFilter';
import ItemAddForm from '../ItemAddForm';
import { Footer } from '../AppFooter';

import './App.css';

export default class App extends Component {
  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem('Drink Coffee', '2021-12-02T22:00:00', 4, 7),
      this.createTodoItem('Make Awesome App', '2020-12-02T12:00:00', 0, 35),
      this.createTodoItem('Have a lunch', '2021-06-02T00:00:00', 1, 48),
    ],
    filter: 'all',
  };

  createTodoItem(label, date, min, sec) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++,
      visible: true,
      date: formatDistanceToNow(Date.parse(date), { addSuffix: true }),
      edit: false,
      min: min,
      sec: sec,
      play: null,
    };
  }

  deleteItem = (id) => {
    let todos = this.state.todoData;
    const idx = todos.findIndex((el) => el.id === id);

    const newArray = [...todos.slice(0, idx), ...todos.slice(idx + 1)];

    this.setState(() => {
      return {
        todoData: newArray,
      };
    });
  };

  addItem = (text, min, sec) => {
    if (!min) {
      min = 0;
    }
    if (!sec) {
      sec = 0;
    }
    const newItem = this.createTodoItem(text, new Date(), min, sec);

    let todos = this.state.todoData;
    const newArr = [...todos, newItem];

    this.setState(() => {
      return {
        todoData: newArr,
      };
    });
  };

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);

    const oldItem = arr[idx];
    const newItem = {
      ...oldItem,
      [propName]: !oldItem[propName],
    };

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  }

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done'),
      };
    });
  };

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important'),
      };
    });
  };

  setVisible = (i) => {
    this.setState(({ todoData }) => {
      todoData[i].visible = true;
    });
  };

  notVisible = (i) => {
    this.setState(({ todoData }) => {
      todoData[i].visible = false;
    });
  };

  onEdit = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'edit'),
      };
    });
  };

  toggleLabel = (arr, id, value, date) => {
    const idx = arr.findIndex((el) => el.id === id);

    const oldItem = arr[idx];
    const newItem = {
      ...oldItem,
      label: value,
      date: formatDistanceToNow(Date.parse(date), { addSuffix: true }),
    };

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  };

  editingItem = (id, value, e) => {
    e.preventDefault();
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleLabel(todoData, id, value, new Date()),
      };
    });
    this.onEdit(id);
  };

  onFilterChange = (filter) => {
    this.setState({ filter });

    const { todoData } = this.state;
    todoData.forEach((item, i) => this.setVisible(i));

    filter === 'done'
      ? todoData.forEach((item, i) => {
        if (!item.done) {
          this.notVisible(i);
        }
      })
      : filter === 'active'
        ? todoData.forEach((item, i) => {
          if (item.done) {
            this.notVisible(i);
          }
        })
        : todoData.forEach((item, i) => this.setVisible(i));
  };

  onClearCompleted = () => {
    const { todoData } = this.state;
    todoData.forEach((item) => {
      if (item.done) {
        this.deleteItem(item.id);
      }
    });
  };

  tactAdd = (arr, id) => {
    const idx = arr.findIndex((el) => el.id === id);
    const oldItem = arr[idx];
    const newItem = {
      ...oldItem,
      min: oldItem.sec > 0 ? oldItem.min : oldItem.min === 0 ? 0 : oldItem.min - 1,
      sec: oldItem.sec > 0 ? oldItem.sec - 1 : oldItem.min === 0 ? 0 : 59,
    };

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  };

  onPlay = (id) => {
    let arr = this.state.todoData;
    const idx = arr.findIndex((el) => el.id === id);
    const oldItem = arr[idx];
    const newItem = {
      ...oldItem,
      play: setInterval(() => {
        this.setState(({ todoData }) => {
          return {
            todoData: this.tactAdd(todoData, id),
          };
        });
      }, 1000),
    };
    this.setState(() => {
      return {
        todoData: [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)],
      };
    });
  };

  onPause = (id) => {
    let arr = this.state.todoData;
    const idx = arr.findIndex((el) => el.id === id);
    const oldItem = arr[idx];
    clearInterval(oldItem.play);
    const newItem = {
      ...oldItem,
      play: null,
    };
    this.setState(() => {
      return {
        todoData: [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)],
      };
    });
  };

  render() {
    const { todoData } = this.state;
    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;

    return (
      <div className='todo-app'>
        <AppHeader done={doneCount} />
        <div className='top-panel d-flex'>
          <ItemStatusFilter filter={this.state.filter} onFilterChange={this.onFilterChange} />
        </div>

        <TodoList
          todos={todoData}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
          onEdit={this.onEdit}
          editingItem={this.editingItem}
          onPlay={this.onPlay}
          onPause={this.onPause}
        />

        <ItemAddForm onItemAdded={this.addItem} />
        <Footer toDo={todoCount} onClearCompleted={this.onClearCompleted} />
      </div>
    );
  }
}
