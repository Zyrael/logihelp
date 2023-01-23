import { configureStore } from '@reduxjs/toolkit'
import routeListReducer from './features/routeListSlice/routeListSlice'

export const store = configureStore({
  reducer: {
    routeList: routeListReducer,
  },
})