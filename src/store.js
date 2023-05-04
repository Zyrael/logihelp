import { configureStore } from "@reduxjs/toolkit";
import routeSheetReducer from "./components/routeSheet/routeSheetSlice";
import modalReducer from "./components/modal/modalslice";
import supplierInfoReducer from "./components/supplierTab/supplierInfoSlice";

export const store = configureStore({
  reducer: {
    routeSheet: routeSheetReducer,
    modal: modalReducer,
    supplierInfo: supplierInfoReducer,
  },
});
