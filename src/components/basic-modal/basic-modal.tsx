import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  IconButton,
  Modal,
  Paper,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { ModalTitle, ModalType } from "../../helpers/constants";
import { getModalType } from "../../store/application/selectors";
import { setModalType } from "../../store/application/application";
import { styles } from "./styles";
import { useModalContent } from "../../hooks/useModalContent";


export const BasicModal: React.FC = (): JSX.Element | null => {
  const dispatch = useDispatch();
  const modalType = useSelector(getModalType);
  const isModal = modalType !== ModalType.NO_MODAL;
  const modalTitle = ModalTitle[modalType];

  const handleClose = () => {
    dispatch(setModalType(ModalType.NO_MODAL));
  };

  const modalContent = useModalContent(handleClose);

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

        <Box sx={styles.containerInner}>
          {modalContent.content}
        </Box>

        {modalContent.buttonControls}
      </Paper>
    </Modal>
  );
};
