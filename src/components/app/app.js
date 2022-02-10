import React, { Component } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import AppHeader from '../app-header';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';
import AppFooter from '../footer';

import './app.css';

export default class App extends Component {
  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem('Drink Coffee', '2021-12-02T22:00:00'),
      this.createTodoItem('Make Awesome App', '2020-12-02T12:00:00'),
      this.createTodoItem('Have a lunch', '2021-06-02T00:00:00'),
    ],
    filter: 'all',
  };

  createTodoItem(label, date) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++,
      visible: true,
      date: formatDistanceToNow(Date.parse(date), { addSuffix: true }),
    };
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);

      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];

      return {
        todoData: newArray,
      };
    });
  };

  addItem = (text) => {
    const newItem = this.createTodoItem(text, new Date());

    this.setState(({ todoData }) => {
      const newArr = [...todoData, newItem];

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

  render() {
    const { todoData } = this.state;
    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;

    return (
      <div className="todo-app">
        <AppHeader done={doneCount} />
        <div className="top-panel d-flex">
          <ItemStatusFilter filter={this.state.filter} onFilterChange={this.onFilterChange} />
        </div>

        <TodoList
          todos={todoData}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />

        <ItemAddForm onItemAdded={this.addItem} />
        <AppFooter toDo={todoCount} onClearCompleted={this.onClearCompleted} />
      </div>
    );
  }
}
