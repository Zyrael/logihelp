import React, {  useState } from 'react';
import './Search.css';

const Search = ({data, addName}) => {
  const [text, setText] = useState('');
  const filteredData = data.filter((name) => name.text.toLowerCase().includes(text.toLowerCase()))
  let id = 0;
  return(
    <div className='search-container'>
      <input id='search-bar' className='search-bar' type={'text'} value={text} onChange={(e) => setText(e.target.value)} />
      <div className='list-container'>
        {
          !!filteredData.length ? 
          <ul className='names-list'>
            {filteredData.map((name) => <li key={++id} tabIndex={0} onClick={addName(name.text)}>{name.text}</li>)}
          </ul>
          :
          <div className="span-container"><span>Notinng here.</span></div>
        }
      </div>
    </div>
  )
}

export default Search; 