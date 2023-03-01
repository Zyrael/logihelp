import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "closed",
  currSupplier: {},
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setStatus: (state, { payload: { status, currSupplier = {} } }) => {
      state.status = status;
      state.currSupplier = currSupplier;
    },
  },
});

export const { setStatus } = modalSlice.actions;

export default modalSlice.reducer;
