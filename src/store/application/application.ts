import { createSlice } from "@reduxjs/toolkit";
import { ModalType } from "../../helpers/constants";


const initialState = {
  modalType: ModalType.NO_MODAL,
};


const applicationSlice = createSlice({
  name: `application`,
  initialState,
  reducers: {
    setModalType: (state, action) => {
      state.modalType = action.payload;
    },
  },
});


const {actions, reducer} = applicationSlice;

export const {
  setModalType,
} = actions;

export {
  reducer,
};
