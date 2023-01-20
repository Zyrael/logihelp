import React, { useState } from 'react';
import './SupplierList.css';

const Search = ({data, addName}) => {
  const [text, setText] = useState('');
  const filteredData = data.filter((item) => item.name.toLowerCase().includes(text.toLowerCase()))
  let id = 0;
  return(
    <div className='search-container'>
      <input id='search-bar' className='search-bar' type={'text'} value={text} onChange={(e) => setText(e.target.value)} />
      <div className='list-container'>
        {
          !!filteredData.length ? 
          <ul className='names-list'>
            {filteredData.map((item) => <li key={++id} tabIndex={0} onClick={addName(item)}>{item.name}</li>)}
          </ul>
          :
          <div className="span-container"><span>Nothing here.</span></div>
        }
      </div>
    </div>
  )
}

export default Search;