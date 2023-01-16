import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useSelector } from "react-redux";

import { ControlButtonType } from "../modal-button-controls/modal-button-controls";
import { ModalButtonControlsType } from "./helpers";
import { ModalButtonsContext } from "../basic-modal/basic-modal";
import { ModalType } from "../../helpers/constants";
import { getModalType } from "../../store/application/selectors";
import { useAddNewPostMutation, useEditPostMutation } from "../api/postsSlice";
import { useModalButtonControlsLabel } from "../../hooks/useLabels";


type ButtonControlsType = Partial<Record<ModalButtonControlsType, ControlButtonType>>;


export const usePostFormButtonControls = (onModalClose: () => void, isFormValid: boolean) => {
  const modalType = useSelector(getModalType);
  const [addNewPost, {isLoading: isAddPostLoading}] = useAddNewPostMutation();
  const [editPost, {isLoading: isEditPostLoading}] = useEditPostMutation();
  const formDisabled = isAddPostLoading || isEditPostLoading;
  const modalButtonControlsLabels = useModalButtonControlsLabel();

  const [modalButtonControls, setModalButtonControls] = useContext(ModalButtonsContext);

  const [buttonControls, setButtonControls]: [
    ButtonControlsType,
    React.Dispatch<React.SetStateAction<ButtonControlsType>>,
  ] = useState({
    [ModalButtonControlsType.SAVE]: {
      label: modalButtonControlsLabels[ModalButtonControlsType.SAVE],
      formSubmitId: `${modalType}`,
      isDisabled: !isFormValid || isAddPostLoading,
      isLoading: isAddPostLoading,
    },
    [ModalButtonControlsType.SEND]: {
      label: modalButtonControlsLabels[ModalButtonControlsType.SEND],
      formSubmitId: `${modalType}`,
      isDisabled: isFormValid || isEditPostLoading,
      isLoading: isEditPostLoading,
    },
    [ModalButtonControlsType.CANCEL]: {
      label: modalButtonControlsLabels[ModalButtonControlsType.CANCEL],
      onClick: onModalClose,
      isDisabled: formDisabled,
    },
  } as ButtonControlsType);

  const updateButtonControls = useCallback((buttonType: ModalButtonControlsType, buttonLoading: boolean) => {
    if (
      buttonControls[buttonType]?.isDisabled !== (!isFormValid || buttonLoading) ||
      buttonControls[buttonType]?.isLoading !== buttonLoading
    ) {
      setButtonControls({
        ...buttonControls,
        [buttonType]: {
          ...buttonControls[buttonType],
          isDisabled: !isFormValid || buttonLoading,
          isLoading: buttonLoading,
        } as ControlButtonType,
      });
    }
  }, [
    isFormValid,
    buttonControls,
  ]);

  useEffect(() => {
    if(modalType === ModalType.ADD_POST) {
      setModalButtonControls([
        buttonControls[ModalButtonControlsType.SAVE],
        buttonControls[ModalButtonControlsType.CANCEL],
      ] as ControlButtonType[]);
    }

    if(modalType === ModalType.EDIT_POST) {
      setModalButtonControls([
        buttonControls[ModalButtonControlsType.SEND],
        buttonControls[ModalButtonControlsType.CANCEL],
      ] as ControlButtonType[]);
    }
  }, [
    setModalButtonControls,
    modalType,
    buttonControls,
  ]);

  useEffect(() => {
    updateButtonControls(ModalButtonControlsType.SAVE, isAddPostLoading);
    updateButtonControls(ModalButtonControlsType.SEND, isEditPostLoading);
  }, [
    isAddPostLoading,
    isEditPostLoading,
    updateButtonControls,
  ]);
};
