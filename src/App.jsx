import React, { useState } from 'react';
import Search from './Search';
import data from './data-8DzaSBw-FcugDvXhNA38z';
import ChosenList from './ChosenList';

const App = () => {
  const [list, setList] = useState([]);
  const addName = (name) => () => setList([...list, name]);

  return (
    <div id='app'>
      <Search className='search' data={data} addName={addName} />
      <ChosenList list={list} />  
    </div>
  )
}

export default App;