import { darken, Theme } from "@mui/material";
import { BORDER_RADIUS, Color } from "../../constants";


const containerStyles = () => ({
  // height: "calc(100% - 50px)",
  // overflowY: `auto`,
});

const postsListStyles = () => ({
  padding: 0,
  overflowY: `auto`,
});

const link = {
  width: "100%",
  textDecoration: "none",
};

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

const avatarStyles = (): {
  [key: string]: number | string;
} => ({
  width: 56,
  height: 56,
  marginRight: 2,
});

const info = () => ({
  textAlign: `left`,
});


export const styles = {
  avatarStyles,
  containerStyles,
  info,
  itemButton,
  link,
  postsListStyles,
};
