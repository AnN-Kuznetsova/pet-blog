import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton, Modal, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { ModalTitle, ModalType } from "../../constants";
import { PostForm } from "../post-form/post-form";
import { getModalType } from "../../store/application/selectors";
import { setModalType } from "../../store/application/application";
import { styles } from "./styles";


// const getModalContent = (modalType: ModalType, onClose: () => void): JSX.Element => {
//   switch (modalType) {
//     case ModalType.ADD_POST:
//       return <PostForm onModalClose={onClose} />;

//     case ModalType.EDIT_POST:
//       return <PostForm onModalClose={onClose} />;

//     default:
//       return <></>;
//   }
// };


export const BasicModal: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const modalType = useSelector(getModalType);
  const isModal = modalType !== ModalType.NO_MODAL;
  const modalTitle = isModal ? ModalTitle[modalType] : ``;

  const handleClose = () => {
    dispatch(setModalType(ModalType.NO_MODAL));
  };

  // const modalContent = getModalContent(modalType, handleClose);

  const ModalContent: Omit< Record<ModalType, JSX.Element>, ModalType.NO_MODAL >= {
    [ModalType.ADD_POST]: <PostForm onModalClose={handleClose} />,
    [ModalType.EDIT_POST]: <PostForm onModalClose={handleClose} />,
  };

  const modalContent = isModal ? ModalContent[modalType] : null;

  return (
    <Modal
      open={isModal}
      onClose={handleClose}
    >
      <Box sx={styles.container}>
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

        {modalContent}
      </Box>
    </Modal>
  );
};
