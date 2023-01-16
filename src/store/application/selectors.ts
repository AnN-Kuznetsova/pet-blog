import { RootStateType } from "../..";
import { SnackType } from "../../types/types";
import type { ModalType } from "../../helpers/constants";
import { Languages } from "../../i18n";


const getModalType = (state: RootStateType): ModalType => state.application.modal.type;

const getSnackbar = (state: RootStateType): Array<SnackType> => state.application.snackbar;

const getLanguage = (state: RootStateType): Languages => state.application.language;


export {
  getLanguage,
  getModalType,
  getSnackbar,
};
