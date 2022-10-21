import { RootStateType } from "../..";
import type { ModalType } from "../../helpers/constants";


const getModalType = (state: RootStateType): ModalType => state.application.modalType;


export {
  getModalType,
};
