import React, { useState, useEffect } from 'react';
import SupplierList from './SupplierList';
import data from './data-8DzaSBw-FcugDvXhNA38z';
import ChosenList from './ChosenList';
import './App.css';

const App = () => {
  const [list, setList] = useState([]);
  const addName = (name) => () => {
    if (name.chosen) return;
    name.chosen = true;
    setList([...list, name]);
  }
  const deleteName = (name) => () => {
    name.chosen = false;
    setList(list.filter((item) => item !== name));
  }

  return (
    <div id='app' className='app'>
      <SupplierList className='search' data={data} addName={addName} />
      <ChosenList list={list} deleteName={deleteName} />
    </div>
  )
}

export default App;