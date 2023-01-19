import React from 'react'
import './ChosenList.css'

const ChosenList = ({list, deleteName}) => {
  let id = 0;
  return (
    <div className='chosen-container'>
      <ul>
        {
          list.map((name) => <li key={++id} onClick={deleteName(name)}>{name}</li>)
        }
      </ul>
    </div>
  )
}

export default ChosenList;