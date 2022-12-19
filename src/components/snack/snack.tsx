import React from "react";
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
import { hideSnack, removeSnack } from "../../store/application/application";
import { SnackType } from "../../types";
import { styles } from "./styles";


export enum SnackbarType {
  SUCCESS = `SUCCESS`,
  ERROR = `ERROR`,
}

const SnackbarSeverity: Record<SnackbarType, AlertColor | undefined> = {
  [SnackbarType.SUCCESS]: `success`,
  [SnackbarType.ERROR]: `error`,
};

const TransitionComponent: React.JSXElementConstructor<TransitionProps & {
  children: React.ReactElement;
}> | undefined = (props) => {
  return <Slide {...props} direction="left" />;
};


export const setSnackTimeout = (cb: ()=>void) => {
  setTimeout(() => {
    cb();
  }, SNACKBAR_AUTO_HIDE_DURATION);
};


export const Snack: React.FC = () => {
  const dispatch = useDispatch();
  const snackbar = useSelector(getSnackbar);

  const anchorOrigin: SnackbarOrigin = {
    vertical: `top`,
    horizontal: `right`,
  };

  const handleClose = (snack: SnackType) => {
    dispatch(hideSnack(snack));
  };

  const handleRemove = (snack: SnackType) => {
    dispatch(removeSnack(snack));
  };

  return (
    <Stack
      spacing={1}
      sx={styles.snackbarStack}
    >
      {snackbar.map((snack) => {
        const severity = SnackbarSeverity[SnackbarType[snack.type]];

        return (
          <Snackbar
            key={snack.id}
            open={snack.isOpen}
            anchorOrigin={anchorOrigin}
            TransitionComponent={TransitionComponent}
            TransitionProps={{onExited: handleRemove.bind(null, snack)}}
            sx={styles.snackbar}
          >
            <Alert
              onClose={handleClose.bind(null, snack)}
              severity={severity}
              variant="filled"
              sx={{ width: `100%` }}
            >
              {snack.message}
            </Alert>
          </Snackbar>
        );
      })
      }
    </Stack>
  );
};
