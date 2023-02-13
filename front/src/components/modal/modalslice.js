import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  content: "",
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

    setContent: (state, action) => {
      state.content = action.payload;
    },
  },
});

export const { openModal, closeModal, setContent } = modalSlice.actions;

export default modalSlice.reducer;
