import React, { useEffect } from "react";
import {
  Alert,
  AlertColor,
  Slide,
  Snackbar,
  SnackbarOrigin,
} from "@mui/material";
import { Stack } from "@mui/system";
import { TransitionProps } from "@mui/material/transitions";
import { useDispatch, useSelector } from "react-redux";

import { SNACKBAR_AUTO_HIDE_DURATION } from "../../helpers/constants";
import { SnackType } from "../../types/types";
import { SnackbarType } from "../../types/additional-types";
import { changeSnack, hideSnack, removeSnack } from "../../store/application/application";
import { getSnackbar } from "../../store/application/selectors";
import { styles } from "./styles";


const SnackbarSeverity: Record<SnackbarType, AlertColor | undefined> = {
  [SnackbarType.SUCCESS]: `success`,
  [SnackbarType.ERROR]: `error`,
};

const TransitionComponent: React.JSXElementConstructor<TransitionProps & {
  children: React.ReactElement;
}> | undefined = (props) => {
  return <Slide {...props} direction="left" />;
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

  useEffect(() => {
    snackbar.forEach((snack) => {
      if (!snack.isTimeout) {
        dispatch(changeSnack({
          ...snack,
          isTimeout: true,
        }));

        setTimeout(() => {
          dispatch(hideSnack(snack));
        }, SNACKBAR_AUTO_HIDE_DURATION);
      }
    });
  }, [dispatch, snackbar]);

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
