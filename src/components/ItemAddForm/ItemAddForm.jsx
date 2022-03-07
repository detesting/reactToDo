import React, { Component } from 'react';

import './ItemAddForm.css';

export default class ItemAddForm extends Component {
  state = {
    label: '',
    min: '',
    sec: '',
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onMinChange = (e) => {
    this.setState({
      min: e.target.value,
    });
  };

  onSecChange = (e) => {
    this.setState({
      sec: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.label.trim().length) {
      this.props.onItemAdded(this.state.label, Math.round(Number(this.state.min)), Math.round(Number(this.state.sec)));
    }
    this.setState({
      label: '',
      min: '',
      sec: '',
    });
  };

  render() {
    return (
      <form className='item-add-form d-flex' onSubmit={this.onSubmit}>
        <div className='input-group'>
          <label htmlFor='inputAdd' />
          <input
            type='text'
            className='form-control col col-lg-10'
            onChange={this.onLabelChange}
            placeholder='What needs to be done'
            value={this.state.label}
            id='inputAdd'
          />
          <label htmlFor='inputMin' />
          <input
            type='text'
            className='form-control col col-lg-2'
            onChange={this.onMinChange}
            placeholder='Min'
            value={this.state.min}
            id='inputMin'
          />
          <label htmlFor='inputSec' />
          <input
            type='text'
            className='form-control col col-lg-2'
            onChange={this.onSecChange}
            placeholder='Sec'
            value={this.state.sec}
            id='inputSec'
          />
          <div className='input-group-append'>
            <button className='btn btn-outline-secondary'>Add Item</button>
          </div>
        </div>
      </form>
    );
  }
}
