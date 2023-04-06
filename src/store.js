import { configureStore } from "@reduxjs/toolkit";
import routeListReducer from "./components/routeSheet/routeList/routeListSlice";
import modalReducer from "./components/modal/modalslice";

export const store = configureStore({
  reducer: {
    routeList: routeListReducer,
    modal: modalReducer,
  },
});
