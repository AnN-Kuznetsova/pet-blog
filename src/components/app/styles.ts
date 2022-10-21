import { Theme } from "@mui/material";

import { BORDER_RADIUS } from "../../helpers/constants";


const globalStyles = (theme: Theme) => ({
  "::-webkit-scrollbar": {
    width: `10px`,
    backgroundColor: theme.palette.primary.main,
    borderRadius: BORDER_RADIUS,
  },

  "::-webkit-scrollbar-track": {
    backgroundColor: theme.palette.primary.main,
    borderRadius: BORDER_RADIUS,
  },

  "::-webkit-scrollbar-thumb": {
    backgroundColor: theme.palette.primary.light,
    borderRadius: BORDER_RADIUS,
  },

  "a": {
    width: "100%",
    textDecoration: "none",
    color: theme.palette.text.primary,

    "&:has(button.Mui-disabled)": {
      pointerEvents: `none` as const,
    },
  },
});

const appStyles = () => ({
  padding: "30px 50px",
  height: "100vh",
  overflowY: "hidden",
});


export const styles = {
  appStyles,
  globalStyles,
};
