import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface AppState {
  searchValue: string
  suppliers: Supplier[]
  routes: Supplier[]
}

const initialState: AppState = {
  searchValue: '',
  suppliers: [],
  routes: []
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setSuppliers: (state, action: PayloadAction<Supplier[]>) => {
      state.suppliers = action.payload
    },
    addRoute: (state, action: PayloadAction<Supplier>) => {
      if (state.routes.find((route) => route.id === action.payload.id)) return
      state.routes.push(action.payload)
    },
    removeRoute: (state, action: PayloadAction<Supplier>) => {
      state.routes = state.routes.filter((route) => route.id !== action.payload.id)
    },
    clearRoutes: (state) => {
      state.routes = []
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload
    }
  }
})

export const { setSuppliers, addRoute, removeRoute, clearRoutes, setSearchValue } = appSlice.actions

export default appSlice.reducer
