import { darken, Theme } from "@mui/material";
import { BORDER_RADIUS, Color } from "../../constants";


const globalStyles = (theme: Theme) => ({
  "::-webkit-scrollbar": {
    width: `10px`,
    backgroundColor: `${darken(theme.palette.primary.dark, 0.3)}`,
    borderRadius: BORDER_RADIUS,
  },

  "::-webkit-scrollbar-track": {
    backgroundColor: `${darken(theme.palette.primary.dark, 0.3)}`,
    borderRadius: BORDER_RADIUS,
  },

  "::-webkit-scrollbar-thumb": {
    backgroundColor: `${darken(theme.palette.primary.dark, 0.5)}`,
    borderRadius: BORDER_RADIUS,
  },
});

const appStyles = () => ({
  padding: "30px 50px",
  height: "100vh",
  overflowY: "hidden",

  color: Color.WHITE,

  backgroundColor: (theme: Theme) => darken(theme.palette.primary.dark, 0.7),
});


export const styles = {
  appStyles,
  globalStyles,
};
