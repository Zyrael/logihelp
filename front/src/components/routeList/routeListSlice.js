import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  routes: [],
};

export const routeListSlice = createSlice({
  name: "routeList",
  initialState,
  reducers: {
    addRoute: (state, action) => {
      const newRoute = action.payload;
      if (state.routes.find((route) => route.id === newRoute.id)) return;
      state.routes.push(newRoute);
    },

    removeRoute: (state, action) => {
      state.routes = state.routes.filter(
        (route) => route.id !== action.payload.id
      );
    },
  },
});

export const { addRoute, removeRoute } = routeListSlice.actions;

export default routeListSlice.reducer;
