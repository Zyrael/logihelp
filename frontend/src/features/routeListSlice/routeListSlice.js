import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  routes: [],
};

export const routeListSlice = createSlice({
  name: "routeList",
  initialState,
  reducers: {
    addRoute: (state, action) => {
      state.routes.push(action.payload);
    },

    removeRoute: (state, action) => {
      state.routes = state.routes.filter(
        (route) => route.name !== action.payload.name
      );
    },
  },
});

export const { addRoute, removeRoute } = routeListSlice.actions;

export default routeListSlice.reducer;
