import React, { useEffect, useState } from "react";
import {
  Alert,
  AlertColor,
  Slide,
  Snackbar,
  SnackbarOrigin,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { TransitionProps } from "@mui/material/transitions";
import { Stack } from "@mui/system";
import { SNACKBAR_AUTO_HIDE_DURATION } from "../../helpers/constants";
import { getSnackbar } from "../../store/application/selectors";
import { setSnackbar } from "../../store/application/application";


export enum SnackbarType {
  NO_SNACK = `NO_SNACK`,
  SUCCESS = `SUCCESS`,
  ERROR = `ERROR`,
}

const SnackbarSeverity: Record<SnackbarType, AlertColor | undefined> = {
  [SnackbarType.NO_SNACK]: undefined,
  [SnackbarType.SUCCESS]: `success`,
  [SnackbarType.ERROR]: `error`,
};

const TransitionComponent: React.JSXElementConstructor<TransitionProps & {
  children: React.ReactElement;
}> | undefined = (props) => {
  return <Slide {...props} direction="left" />;
};


export const Snack: React.FC = () => {
  const {type, message} = useSelector(getSnackbar);
  const dispatch = useDispatch();
  const isOpen = type !== SnackbarType.NO_SNACK;
  const [severity, setSeverity] = useState(SnackbarSeverity[SnackbarType[type]]);

  const anchorOrigin: SnackbarOrigin = {
    vertical: `top`,
    horizontal: `right`,
  };

  const handleClose = () => {
    dispatch(setSnackbar({
      type: SnackbarType.NO_SNACK,
      message: ``,
    }));
  };

  useEffect(() => {
    const newSeverity = SnackbarSeverity[SnackbarType[type]];
    if (newSeverity) {
      setSeverity(newSeverity);
    }
  }, [type]);

  return (
    <Stack spacing={1}>
      <Snackbar
        open={isOpen}
        autoHideDuration={SNACKBAR_AUTO_HIDE_DURATION}
        onClose={handleClose}
        anchorOrigin={anchorOrigin}
        TransitionComponent={TransitionComponent}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          variant="filled"
          sx={{ width: `100%` }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
};
