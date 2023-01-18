import React, {  useState } from 'react';
import './Search.css';
import data from './data-8DzaSBw-FcugDvXhNA38z';

function Search() {
  const [text, setText] = useState('');
  const filteredData = !!text ?
    data.filter((name) => name.text.toLowerCase().includes(text.toLowerCase()))
    :
    [];
  let id = 0;
  const listClass = !!filteredData.length ? 'names-list' : 'names-list display-none'
  return(
    <div className='search-container'>
      <div className="search-inner">
        <input id='search-bar' className='search-bar' type={'text'} value={text} onChange={(e) => setText(e.target.value)} />
        <div className='list-container'>
          <ul className={listClass}>
            {filteredData.map((name) => <li key={++id} tabIndex={0}>{name.text}</li>)}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Search; 