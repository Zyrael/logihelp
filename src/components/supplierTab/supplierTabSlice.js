import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  supplierTabOpened: false,
  mode: "browseList",
  currentSupplier: {},
};

export const supplierTabSlice = createSlice({
  name: "supplierTab",
  initialState,
  reducers: {
    openSupplierTab: (state) => {
      state.supplierTabOpened = true;
    },
    closeSupplierTab: (state) => {
      state.supplierTabOpened = false;
    },
    setCurrentSupplier: (state, action) => {
      state.currentSupplier = action.payload;
    },
    setMode: (state, action) => {
      state.mode = action.payload;
    },
  },
});

export const {
  openSupplierTab,
  closeSupplierTab,
  setMode,
  setCurrentSupplier,
} = supplierTabSlice.actions;

export default supplierTabSlice.reducer;
