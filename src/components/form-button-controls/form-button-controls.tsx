import React from "react";
import { Box, Button } from "@mui/material";


export enum FormButtonControlsType {
  CHANGE,
  SAVE,
  SEND,
  CANCEL,
}

export const FormButtonControlsTitle: Record<FormButtonControlsType, string> = {
  [FormButtonControlsType.SAVE]: `Save`,
  [FormButtonControlsType.SEND]: `Send`,
  [FormButtonControlsType.CHANGE]: `Change`,
  [FormButtonControlsType.CANCEL]: `Cancel`,
};

export interface ControlButtonType {
  type: FormButtonControlsType;
  isDisabled?: boolean;
  isSubmit?: boolean;
  onClick?: () => void;
}

interface PropsType {
  buttons: ControlButtonType[];
}


export const FormButtonControls: React.FC<PropsType> = (props) => {
  const {buttons} = props;

  return (
    <Box>
      {buttons.map((button) => {
        const label = FormButtonControlsTitle[button.type];

        return (
          <Button
            key={button.type}
            variant="contained"
            disabled={button.isDisabled}
            type={`${button.isSubmit ? "submit" : "button"}`}
            onClick={button.onClick}
          >
            {label}
          </Button>
        );
      })}
    </Box>
  );
};
