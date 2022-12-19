import { RootStateType } from "../..";
import { SnackType } from "../../types";
import type { ModalType } from "../../helpers/constants";


const getModalType = (state: RootStateType): ModalType => state.application.modal.type;

const getSnackbar = (state: RootStateType): Array<SnackType> => state.application.snackbar;


export {
  getModalType,
  getSnackbar,
};
