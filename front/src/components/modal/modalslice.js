import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  content: "info",
  currSupplier: {},
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

    setContentInfo: (state) => {
      state.content = "info";
    },

    setContentForm: (state) => {
      state.content = "form";
    },

    setCurrSupplier: (state, action) => {
      state.currSupplier = action.payload;
    },
  },
});

export const {
  openModal,
  closeModal,
  setContentInfo,
  setContentForm,
  setCurrSupplier,
} = modalSlice.actions;

export default modalSlice.reducer;
