import { Theme } from "@mui/material";

import { ColorType } from "../../constants";
import { getColor as getColorRaw } from "../../helpers/utils";


const container = (theme: Theme) => {
  const getColor = getColorRaw.bind(null, theme);

  return {
    display: `flex`,
    marginBottom: 7,

    "& >:not(:last-child)": {
      marginRight: 1,
    },

    "&  >*:has(button)": {
      width: `auto`,
    },

    "&  >*:has(button.Mui-disabled)": {
      pointerEvents: `none`,
    },

    "& button.MuiButton-root": {
      backgroundColor: getColor(ColorType.BG),

      "&.Mui-disabled": {
        backgroundColor: getColor(ColorType.DISABLED_BG),
      },

      "&:hover": {
        backgroundColor: getColor(ColorType.HOVER_BG),
      },
    },
  };
};


export const styles = {
  container,
};
