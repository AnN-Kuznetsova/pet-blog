import React from "react";
import { Box, Button, Modal } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { ModalType } from "../../constants";
import { PostForm } from "../post-form/post-form";
import { getModalType } from "../../store/application/selectors";
import { styles } from "./styles";
import { setModalType } from "../../store/application/application";


export const BasicModal: React.FC = (): JSX.Element | null => {
  const dispatch = useDispatch();
  const modalType = useSelector(getModalType);

  const handleClose = () => {
    dispatch(setModalType(ModalType.NO_MODAL));
  };

  return (
    <Modal
      open={modalType !== ModalType.NO_MODAL}
      onClose={handleClose}
    >
      <Box sx={styles.container}>
        <Button></Button>

        {modalType === ModalType.ADD_POST &&
          <PostForm />
        }

        {modalType === ModalType.EDIT_POST &&
          <PostForm />
        }
      </Box>
    </Modal>
  );
};
