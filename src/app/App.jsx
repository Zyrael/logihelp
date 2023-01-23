import React from 'react'
import { SupplierList, RouteList } from '../components'
import data from '../data'
import './App.css'

export const App = () => {
  return (
    <div id='app' className='app'>
      <SupplierList className='search' data={data} />
      <RouteList />
    </div>
  )
}