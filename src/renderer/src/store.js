import { configureStore } from "@reduxjs/toolkit";
import routeSheetReducer from "./components/routeSheet/routeSheetSlice";
import supplierTabReducer from "./components/supplierTab/supplierTabSlice";

export const store = configureStore({
  reducer: {
    routeSheet: routeSheetReducer,
    supplierTab: supplierTabReducer,
  },
});
