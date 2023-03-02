import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "closed",
  currSupplier: {},
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setMode: (state, action) => {
      const { mode, supplier } = action.payload;
      state.mode = mode;
      state.currSupplier = supplier;
    },
  },
});

export const { setMode } = modalSlice.actions;

export default modalSlice.reducer;
