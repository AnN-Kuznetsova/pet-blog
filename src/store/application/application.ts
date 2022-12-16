import { createSlice } from "@reduxjs/toolkit";
import { ModalType } from "../../helpers/constants";
import { SnackbarType } from "../../components/snack/snack";


const initialState: {
  modal: {
    type: ModalType;
  },
  snackbar: {
    type: SnackbarType;
    message: string;
  },
} = {
  modal: {
    type: ModalType.NO_MODAL,
  },
  snackbar: {
    type: SnackbarType.NO_SNACK,
    message: ``,
  },
};


const applicationSlice = createSlice({
  name: `application`,
  initialState,
  reducers: {
    setModalType: (state, action) => {
      state.modal.type = action.payload;
    },
    setSnackbar: (state, action: {type: string; payload: {
      type: SnackbarType;
      message: string;
    }}) => {
      state.snackbar = action.payload;
    },
  },
});


const {actions, reducer} = applicationSlice;

export const {
  setModalType,
  setSnackbar,
} = actions;

export {
  reducer,
};
