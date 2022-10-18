import { RootStateType } from "../..";
import { ModalType } from "../../components/modal/modal";


const getModalType = (state: RootStateType): ModalType => state.application.modalType;


export {
  getModalType,
};
