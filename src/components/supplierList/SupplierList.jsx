import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addRoute } from '../../features/routeListSlice/routeListSlice'
import './SupplierList.css'

export const SupplierList = ({data}) => {
  const [text, setText] = useState('');
  const filteredData = data.filter((item) => item.name.toLowerCase().includes(text.toLowerCase()));
  const dispatch = useDispatch();
  let id = 0;
  return(
    <div className='search-container'>
      <input id='search-bar' className='search-bar' type={'text'} value={text} onChange={(e) => setText(e.target.value)} />
      <div className='list-container'>
        {
          !!filteredData.length ?
          <ul className='names-list'>
            {filteredData.map((route) => <li key={++id} tabIndex={0} onClick={() => dispatch(addRoute(route))}>{route.name}</li>)}
          </ul>
          :
          <div className="span-container"><span>Nothing here.</span></div>
        }
      </div>
    </div>
  )
}
