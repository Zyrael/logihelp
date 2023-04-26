import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  opened: false,
  supplier: {},
};

export const supplierInfoSlice = createSlice({
  name: "supplierInfo",
  initialState,
  reducers: {
    openSupplierInfo: (state, action) => {
      const { supplier } = action.payload;
      state.opened = true;
      state.supplier = supplier;
    },
    closeSupplierInfo: (state) => {
      state.opened = false;
    },
  },
});

export const { openSupplierInfo, closeSupplierInfo } =
  supplierInfoSlice.actions;

export default supplierInfoSlice.reducer;
