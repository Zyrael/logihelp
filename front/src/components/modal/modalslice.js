import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  content: {
    type: "info",
    supplier: {},
  },
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state) => {
      state.isOpen = true;
    },

    closeModal: (state) => {
      state.isOpen = false;
    },

    setContent: (state, { payload: { type, supplier = {} } }) => {
      state.content = { type, supplier };
    },
  },
});

export const { openModal, closeModal, setContent } = modalSlice.actions;

export default modalSlice.reducer;
