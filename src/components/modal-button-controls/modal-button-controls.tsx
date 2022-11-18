import React, { useContext } from "react";
import { Box } from "@mui/material";

import { styles } from "./styles";
import { LoadingButton } from "@mui/lab";
import { ModalButtonsContext } from "../basic-modal/basic-modal";
import { ModalType } from "../../helpers/constants";


export enum ModalButtonControlsType {
  CHANGE = `Change`,
  SAVE = `Save`,
  SEND = `Send`,
  CANCEL = `Cancel`,
}

export interface ControlButtonType {
  label: ModalButtonControlsType;
  onClick?: () => void;
  formSubmitId?: string;
  isLoading?:boolean;
  isDisabled?: boolean;
}

export const ModalControls: Record<ModalType, ModalButtonControlsType[]> = {
  [ModalType.NO_MODAL]: [],
  [ModalType.ADD_POST]: [ModalButtonControlsType.SAVE, ModalButtonControlsType.CANCEL],
  [ModalType.EDIT_POST]: [ModalButtonControlsType.SEND, ModalButtonControlsType.CANCEL],
};

export const DEFAULT_MODAL_BUTTON_CONTROLS: ControlButtonType[] = []; //ModalControls[ModalType.NO_MODAL]; //[];


export const ModalButtonControls: React.FC = () => {
  const [modalButtonControls, setModalButtonControls] = useContext(ModalButtonsContext);

  return (
    <Box sx={styles.container}>
      {modalButtonControls.map((button) => {
        return (
          <LoadingButton
            key={button.label}
            variant="contained"
            disabled={button.isDisabled}
            type={`${button.formSubmitId ? "submit" : "button"}`}
            form={button.formSubmitId}
            onClick={button.onClick}
            loading={button.isLoading}
          >
            {button.label}
          </LoadingButton>
        );
      })}
    </Box>
  );
};
