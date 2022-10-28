import { createSlice } from "@reduxjs/toolkit";
import { ControlButtonType } from "../../components/modal-button-controls/modal-button-controls";
import { ModalType } from "../../helpers/constants";


const initialState: {
  modal: {
    type: ModalType;
    buttonControls: ControlButtonType[];
  }
} = {
  modal: {
    type: ModalType.NO_MODAL,
    buttonControls: [],
  },
};


const applicationSlice = createSlice({
  name: `application`,
  initialState,
  reducers: {
    setModalType: (state, action) => {
      state.modal.type = action.payload;

      if (action.payload === ModalType.NO_MODAL) {
        state.modal.buttonControls = [];
      }
    },
    setModalButtonControls: (state, action) => {
      state.modal.buttonControls = action.payload;
    },
  },
});


const {actions, reducer} = applicationSlice;

export const {
  setModalType,
  setModalButtonControls,
} = actions;

export {
  reducer,
};
