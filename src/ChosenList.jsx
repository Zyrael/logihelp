import React from 'react'
import './ChosenList.css'

const ChosenList = ({list, deleteName}) => {
  let id = 0;
  return (
    <div className='chosen-container'>
      <ul>
        {
          list.map((item) => <li key={++id} onClick={deleteName(item)}>{item.name}</li>)
        }
      </ul>
    </div>
  )
}

export default ChosenList;