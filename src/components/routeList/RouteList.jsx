import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { removeRoute } from '../../features/routeListSlice/routeListSlice';
import './RouteList.css'

export const RouteList = () => {
  let id = 0;
  const routes = useSelector((state) => state.routeList.routes);
  const dispatch = useDispatch();
  return (
    <div className='chosen-container'>
      <ul>
        {
          routes.map((route) => <li key={++id} onClick={() => dispatch(removeRoute(route))}>{route.name}</li>)
        }
      </ul>
    </div>
  )
}
