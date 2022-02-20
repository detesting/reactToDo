import React, { Component } from 'react';

import './ItemAddForm.css';

export default class ItemAddForm extends Component {
  state = {
    label: '',
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.label.trim().length) {
      this.props.onItemAdded(this.state.label);
    }
    this.setState({
      label: '',
    });
  };

  render() {
    return (
      <form className="item-add-form d-flex" onSubmit={this.onSubmit}>
        <label htmlFor="inputAdd" />
        <input
          type="text"
          className="form-control"
          onChange={this.onLabelChange}
          placeholder="What needs to be done"
          value={this.state.label}
          id="inputAdd"
        />
        <button className="btn btn-outline-secondary">Add Item</button>
      </form>
    );
  }
}
