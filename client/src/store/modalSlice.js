import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModal(state) {
      state.show = true;
    },
    hideModal(state) {
      state.show = false;
    },
  },
});

const { hideModal, showModal } = modalSlice.actions;

export default modalSlice.reducer;
