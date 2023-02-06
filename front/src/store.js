import { configureStore } from "@reduxjs/toolkit";
import routeListReducer from "./components/routeList/routeListSlice";

export const store = configureStore({
  reducer: {
    routeList: routeListReducer,
  },
});
