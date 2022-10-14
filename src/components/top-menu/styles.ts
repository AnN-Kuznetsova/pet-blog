import { darken, Theme } from "@mui/material";


enum ColorType {
  BG = `BG`,
  HOVER_BG = `HOVER_BG`,
}


const container = (theme: Theme) => {
  const getColor = (colorType: ColorType) => {
    switch (colorType) {
    case ColorType.BG:
      return `${darken(theme.palette.primary.light, 0.5)}`;

    case ColorType.HOVER_BG:
      return `${darken(theme.palette.primary.light, 0.3)}`;

    default:
      return theme.palette.primary.main;
    }
  };

  return {
    display: `flex`,
    marginBottom: 7,

    "& > *": {
      width: `auto`,
      backgroundColor: getColor(ColorType.BG),
      borderRadius: 1,

      "&:hover": {
        backgroundColor: getColor(ColorType.HOVER_BG),
      },
    },

    "& button": {
      backgroundColor: getColor(ColorType.BG),

      "&:hover": {
        backgroundColor: getColor(ColorType.HOVER_BG),
      },
    },

    "& >:not(:last-child)": {
      marginRight: 1,
    },
  };
};


export const styles = {
  container,
};
