import { RootStateType } from "../..";
import type { ModalType } from "../../helpers/constants";
import type { SnackbarType } from "../../components/snack/snack";


const getModalType = (state: RootStateType): ModalType => state.application.modal.type;

const getSnackbar = (state: RootStateType): {
  type: SnackbarType;
  message: string;
} => state.application.snackbar;


export {
  getModalType,
  getSnackbar,
};
