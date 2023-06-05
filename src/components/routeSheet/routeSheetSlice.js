import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  routes: [],
};

export const routeSheetSlice = createSlice({
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
    updateRoute: (state, action) => {
      const updated = action.payload;
      const currentIndex = state.routes.findIndex(
        (route) => route.id === updated.id
      );
      state.routes[currentIndex] = updated;
    },
    removeAllRoutes: (state) => {
      state.routes = [];
    },
  },
});

export const { addRoute, removeRoute, updateRoute, removeAllRoutes } =
  routeSheetSlice.actions;

export default routeSheetSlice.reducer;
