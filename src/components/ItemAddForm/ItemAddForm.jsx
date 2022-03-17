import React, { useState } from 'react';

import './ItemAddForm.css';

export default function ItemAddForm({ onItemAdded }) {
  const [label, setLabel] = useState('');
  const [min, setMin] = useState('');
  const [sec, setSec] = useState('');

  const onLabelChange = (e) => {
    setLabel(e.target.value);
  };

  const onMinChange = (e) => {
    if (!e.target.value.length) {
      setMin(e.target.value);
    }
    if (e.target.value.length <= 4) {
      if (e.target.value.length) {
        if (Number(e.target.value[e.target.value.length - 1]) || e.target.value[e.target.value.length - 1] === '0') {
          setMin(e.target.value);
        }
      }
    }
  };

  const onSecChange = (e) => {
    if (!e.target.value.length) {
      setSec(e.target.value);
    }
    if (e.target.value.length <= 4) {
      if (e.target.value.length) {
        if (Number(e.target.value[e.target.value.length - 1]) || e.target.value[e.target.value.length - 1] === '0') {
          if (Number(e.target.value) <= 59) {
            setSec(e.target.value);
          }
        }
      }
    }

  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (label.trim().length) {
      onItemAdded(label, Math.round(Number(min)), Math.round(Number(sec)));
    }
    setMin('');
    setLabel('');
    setSec('');
  };
  return (
    <form className='item-add-form d-flex' onSubmit={onSubmit}>
      <div className='input-group'>
        <label htmlFor='inputAdd' />
        <input
          type='text'
          className='form-control col col-lg-10'
          onChange={onLabelChange}
          placeholder='What needs to be done'
          value={label}
          id='inputAdd'
        />
        <label htmlFor='inputMin' />
        <input
          type='text'
          className='form-control col col-lg-2'
          onChange={onMinChange}
          placeholder='Min'
          value={min}
          id='inputMin'
        />
        <label htmlFor='inputSec' />
        <input
          type='text'
          className='form-control col col-lg-2'
          onChange={onSecChange}
          placeholder='Sec'
          value={sec}
          id='inputSec'
        />
        <div className='input-group-append'>
          <button className='btn btn-outline-secondary'>Add Item</button>
        </div>
      </div>
    </form>
  );
}
