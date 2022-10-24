import React from "react";
import { Box, Button } from "@mui/material";
import { useSelector } from "react-redux";

import { ModalType } from "../../helpers/constants";
import { getModalType } from "../../store/application/selectors";
import { styles } from "./styles";


enum ModalButtonControlsType {
  CHANGE = `Change`,
  SAVE = `Save`,
  SEND = `Send`,
  CANCEL = `Cancel`,
}

interface ControlButtonType {
  label: ModalButtonControlsType;
  isDisabled?: boolean;
  onClick?: () => void;
  formSubmitId?: string;
}

const ModalControls: Record<ModalType, ModalButtonControlsType[]> = {
  [ModalType.NO_MODAL]: [],
  [ModalType.ADD_POST]: [ModalButtonControlsType.SAVE, ModalButtonControlsType.CANCEL],
  [ModalType.EDIT_POST]: [ModalButtonControlsType.SEND, ModalButtonControlsType.CANCEL],
};

interface PropsType {
  onModalClose: () => void;
  formSubmitId: string;
}


export const ModalButtonControls: React.FC<PropsType> = (props) => {
  const {
    onModalClose,
    formSubmitId,
  } = props;
  const modalType = useSelector(getModalType);

  const handleCancel = () => {
    onModalClose();
  };

  const ModalButton: Record<ModalButtonControlsType, ControlButtonType> = {
    [ModalButtonControlsType.SAVE]: {
      label: ModalButtonControlsType.SAVE,
      formSubmitId,
      // isDisabled?: boolean;
    },
    [ModalButtonControlsType.SEND]: {
      label: ModalButtonControlsType.SEND,
      formSubmitId,
      // isDisabled?: boolean;
    },
    [ModalButtonControlsType.CHANGE]: {
      label: ModalButtonControlsType.CHANGE,
    },
    [ModalButtonControlsType.CANCEL]: {
      label: ModalButtonControlsType.CANCEL,
      onClick: handleCancel,
    },
  };

  const controlButtons = ModalControls[modalType].map((control) => ModalButton[control]);

  return (
    <Box sx={styles.container}>
      {controlButtons.map((button) => {
        return (
          <Button
            key={button.label}
            variant="contained"
            disabled={button.isDisabled}
            type={`${button.formSubmitId ? "submit" : "button"}`}
            form={button.formSubmitId}
            onClick={button.onClick}
          >
            {button.label}
          </Button>
        );
      })}
    </Box>
  );
};
