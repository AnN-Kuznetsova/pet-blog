import { RootStateType } from "../..";
import { ControlButtonType } from "../../components/modal-button-controls/modal-button-controls";
import type { ModalType } from "../../helpers/constants";


const getModalType = (state: RootStateType): ModalType => state.application.modal.type;

const getModalButtonControls = (state: RootStateType): ControlButtonType[] => state.application.modal.buttonControls;


export {
  getModalType,
  getModalButtonControls,
};
