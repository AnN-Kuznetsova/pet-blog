import { darken, Theme } from "@mui/material";
import { BORDER_RADIUS, Color } from "../../constants";


const itemButton = (theme: Theme) => {
  return {
    display: `flex`,
    justifyContent: `flex-start`,
    width: `100%`,
    color: `${Color.WHITE}`,
    textTransform: `none`,
    border: `1px solid ${darken(theme.palette.primary.light, 0.5)}`,
    borderRadius: BORDER_RADIUS,
  };
};

const avatar = (): {
  [key: string]: number | string;
} => ({
  marginRight: 2,
});

const info = () => ({
  textAlign: `left`,
});


export const styles = {
  avatar,
  info,
  itemButton,
};
