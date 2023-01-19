import React from 'react'

const ChosenList = ({list}) => {
  let id = 0;
  return (
    <ul>
      {
        list.map((name) => <li key={++id}>{name}</li>)
      }
    </ul>
  )
}

export default ChosenList;