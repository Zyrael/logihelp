import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  supplierTabOpened: false,
  mode: "browseSupplier",
  currentSupplier: {
    id: "",
    name: "",
    url: "",
    address: "",
    contacts: "",
    additionalData: "",
  },
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
    clearSupplierTab: (state) => {
      state.currentSupplier = {
        name: "",
        url: "",
        address: "",
        contacts: "",
        additionalData: "",
      };
      state.mode = null;
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
  clearSupplierTab,
} = supplierTabSlice.actions;

export default supplierTabSlice.reducer;
