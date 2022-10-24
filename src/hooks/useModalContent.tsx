import { useSelector } from "react-redux";
import { ModalButtonControls } from "../components/modal-button-controls/modal-button-controls";
import { PostForm } from "../components/post-form/post-form";
import { ModalType } from "../helpers/constants";
import { getModalType } from "../store/application/selectors";


const FormId: {
  [key: string]: string;
} = {
  [ModalType.ADD_POST]: `addPostForm`,
  [ModalType.EDIT_POST]: `editPostForm`,
};


export const useModalContent = (onModalClose: () => void): {
  content: JSX.Element;
  buttonControls: JSX.Element;
} => {
  const modalType = useSelector(getModalType);
  const formSubmitId = FormId[modalType] || ``;

  const Content: Record<ModalType, JSX.Element> = {
    [ModalType.NO_MODAL]: <></>,
    [ModalType.ADD_POST]: <PostForm formSubmitId={formSubmitId} />,
    [ModalType.EDIT_POST]: <PostForm formSubmitId={formSubmitId} />,
  };

  const ButtonControls: Record<ModalType, JSX.Element> = {
    [ModalType.NO_MODAL]: <></>,
    [ModalType.ADD_POST]: <ModalButtonControls formSubmitId={formSubmitId} onModalClose={onModalClose} />,
    [ModalType.EDIT_POST]: <ModalButtonControls formSubmitId={formSubmitId} onModalClose={onModalClose} />,
  };

  return {
    content: Content[modalType],
    buttonControls: ButtonControls[modalType],
  };
};
