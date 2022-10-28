import { useSelector } from "react-redux";
import { PostForm } from "../components/post-form/post-form";
import { ModalType } from "../helpers/constants";
import { getModalType } from "../store/application/selectors";


export const useModalContent = (onModalClose: () => void): JSX.Element => {
  const modalType = useSelector(getModalType);

  const Content: Record<ModalType, JSX.Element> = {
    [ModalType.NO_MODAL]: <></>,
    [ModalType.ADD_POST]: <PostForm onModalClose={onModalClose} />,
    [ModalType.EDIT_POST]: <PostForm onModalClose={onModalClose} />,
  };

  return Content[modalType];
};
