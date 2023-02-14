import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  content: "",
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModalWithContent: (state, action) => {
      state.content = action.payload;
      state.isOpen = true;
    },

    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openModalWithContent, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
