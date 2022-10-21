import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Modal, Paper, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { ModalTitle, ModalType } from "../../helpers/constants";
import { PostForm } from "../post-form/post-form";
import { getModalType } from "../../store/application/selectors";
import { setModalType } from "../../store/application/application";
import { styles } from "./styles";


interface ModalContentPropsType {
  modalType: ModalType;
  onClose: () => void;
}


const ModalContent: React.FC<ModalContentPropsType> = (props): JSX.Element => {
  const {
    modalType,
    onClose,
  } = props;

  const Content: Record<ModalType, JSX.Element> = {
    [ModalType.NO_MODAL]: <></>,
    [ModalType.ADD_POST]: <PostForm onModalClose={onClose} />,
    [ModalType.EDIT_POST]: <PostForm onModalClose={onClose} />,
  };

  return Content[modalType];
};


export const BasicModal: React.FC = (): JSX.Element | null => {
  const dispatch = useDispatch();
  const modalType = useSelector(getModalType);
  const isModal = modalType !== ModalType.NO_MODAL;
  const modalTitle = ModalTitle[modalType];

  const handleClose = () => {
    dispatch(setModalType(ModalType.NO_MODAL));
  };

  return (
    <Modal
      open={isModal}
      onClose={handleClose}
    >
      <Paper sx={styles.container}>
        <Typography
          variant="h5"
          sx={styles.title}
        >
          {modalTitle}
        </Typography>

        <IconButton
          aria-label="close"
          sx={styles.closeButton}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>

        <ModalContent
          modalType={modalType}
          onClose={handleClose}
        />
      </Paper>
    </Modal>
  );
};
