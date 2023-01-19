import React, { useState } from 'react';
import Search from './Search';
import data from './data-8DzaSBw-FcugDvXhNA38z';
import ChosenList from './ChosenList';

const App = () => {
  const [list, setList] = useState([]);
  const addName = (name) => () => setList([...list, name]);
  const deleteName = (name) => () => setList(list.filter((item) => item !== name));

  return (
    <div id='app' className='app'>
      <Search className='search' data={data} addName={addName} />
      <ChosenList list={list} deleteName={deleteName} />
    </div>
  )
}

export default App;