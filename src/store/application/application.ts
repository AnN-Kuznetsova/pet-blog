import { createSlice } from "@reduxjs/toolkit";
import { ModalType } from "../../helpers/constants";
import { Languages } from "../../i18n";
import type { SnackType, SnackTypeRaw } from "../../types";


const initialState: {
  language: Languages,
  modal: {
    type: ModalType;
  },
  snackbar: Array<SnackType>,
} = {
  language: Languages.EN,
  modal: {
    type: ModalType.NO_MODAL,
  },
  snackbar: [],
};


const applicationSlice = createSlice({
  name: `application`,
  initialState,
  reducers: {
    changeLanguage: (state, action: {type: string; payload: Languages}) => {
      state.language = action.payload;
    },

    setModalType: (state, action: {type: string; payload: ModalType}) => {
      state.modal.type = action.payload;
    },

    addSnack: (state, action: {type: string; payload: SnackTypeRaw}) => {
      const addedSnack: SnackType = {
        ...action.payload,
        isOpen: true,
        isTimeout: false,
      };
      const newSnackbar = [...state.snackbar, addedSnack];
      state.snackbar = newSnackbar;
    },

    changeSnack: (state, action: {type: string; payload: SnackType}) => {
      const newSnackData = action.payload;

      state.snackbar = state.snackbar.map((snack) => {
        if (snack.id === newSnackData.id) {
          return newSnackData;
        }

        return {...snack};
      });
    },

    hideSnack: (state, action: {type: string; payload: SnackType}) => {
      const hiddenSnack = action.payload;

      state.snackbar = state.snackbar.map((snack) => {
        if (snack.id === hiddenSnack.id) {
          return {
            ...snack,
            isOpen: false,
          };
        }

        return {...snack};
      });
    },

    removeSnack: (state, action: {type: string; payload: SnackType}) => {
      const removableSnack = action.payload;
      state.snackbar = state.snackbar.filter((snack) => snack.id !== removableSnack.id);
    },
  },
});


const {actions, reducer} = applicationSlice;

export const {
  changeLanguage,
  setModalType,
  addSnack,
  changeSnack,
  hideSnack,
  removeSnack,
} = actions;

export {
  reducer,
};
