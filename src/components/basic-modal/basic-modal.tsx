import React, { Dispatch, SetStateAction, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  IconButton,
  Modal,
  Paper,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { ControlButtonType, DEFAULT_MODAL_BUTTON_CONTROLS, ModalButtonControls } from "../modal-button-controls/modal-button-controls";
import { ModalType } from "../../helpers/constants";
import { getModalType } from "../../store/application/selectors";
import { setModalType } from "../../store/application/application";
import { styles } from "./styles";
import { useModalContent } from "../../hooks/useModalContent";


const ModalTitle: Record<ModalType, string> = {
  [ModalType.NO_MODAL]: ``,
  [ModalType.ADD_POST]: `post.title.add`,
  [ModalType.EDIT_POST]: `post.title.edit`,
};

type ModalButtonsContextType = [
  modalButtonControls: ControlButtonType[],
  setModalButtonControls: Dispatch<SetStateAction<ControlButtonType[]>>,
];

export const ModalButtonsContext = React.createContext({} as ModalButtonsContextType);


export const BasicModal: React.FC = (): JSX.Element | null => {
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const modalType = useSelector(getModalType);
  const isModal = modalType !== ModalType.NO_MODAL;
  const modalTitle = t(ModalTitle[modalType]);
  const modalButtonControls = useState(DEFAULT_MODAL_BUTTON_CONTROLS);

  const handleClose = () => {
    dispatch(setModalType(ModalType.NO_MODAL));
  };

  const modalContent = useModalContent(handleClose);

  return (
    <Modal
      open={isModal}
      onClose={handleClose}
    >
      <ModalButtonsContext.Provider value={modalButtonControls}>
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
            {modalContent}
          </Box>

          <ModalButtonControls />
        </Paper>
      </ModalButtonsContext.Provider>
    </Modal>
  );
};
