import { RootStateType } from "../..";
import type { ModalType } from "../../constants";


const getModalType = (state: RootStateType): ModalType => state.application.modalType;


export {
  getModalType,
};
