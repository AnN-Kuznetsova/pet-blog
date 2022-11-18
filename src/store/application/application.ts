import { createSlice } from "@reduxjs/toolkit";
import { ModalType } from "../../helpers/constants";


const initialState: {
  modal: {
    type: ModalType;
  }
} = {
  modal: {
    type: ModalType.NO_MODAL,
  },
};


const applicationSlice = createSlice({
  name: `application`,
  initialState,
  reducers: {
    setModalType: (state, action) => {
      state.modal.type = action.payload;
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
