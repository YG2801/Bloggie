import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showModal: false,
  purpose: '',
  action: null,
  params: {},
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.showModal = true;
      state.purpose = action.payload.purpose;
      state.action = action.payload.action;
      state.params = action.payload.params;
    },
    closeModal: (state) => {
      state.showModal = false;
      state.purpose = '';
      state.action = null;
      state.params = {};
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
