import type { Theme } from "@mui/material";

import { BORDER_RADIUS } from "../../helpers/constants";


const itemButton = (theme: Theme) => {
  return {
    display: `flex`,
    justifyContent: `flex-start`,
    width: `100%`,
    textTransform: `none`,
    border: `1px solid ${theme.palette.primary.main}`,
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
