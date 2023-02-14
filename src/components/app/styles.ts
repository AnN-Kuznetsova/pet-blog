import { Theme } from "@mui/material";


const SCROLL_ACTIVE_SIZE = 10; // px
const SCROLL_VISIBLE_SIZE = 5; // px

const getBackgroundStyles = (color: string, size: number) => {
  const borderWidth = (SCROLL_ACTIVE_SIZE - size) / 2;
  const borderStyle = `${borderWidth}px solid transparent`;

  return {
    backgroundColor: `${color}`,
    backgroundClip: `padding-box`,
    border: borderStyle,
    borderRadius: `${borderWidth ? (SCROLL_ACTIVE_SIZE - size) : SCROLL_ACTIVE_SIZE / 2}px`,
  };
};

const globalStyles = (theme: Theme) => ({
  "*::-webkit-scrollbar": {
    width: SCROLL_ACTIVE_SIZE,
    height: SCROLL_ACTIVE_SIZE,

    ...getBackgroundStyles(theme.palette.primary.main, SCROLL_VISIBLE_SIZE),
  },

  "*::-webkit-scrollbar-thumb": {
    ...getBackgroundStyles(theme.palette.primary.light, SCROLL_VISIBLE_SIZE),
  },

  "*:hover": {
    // color: theme.palette.primary.light,

    "&::-webkit-scrollbar": {
      ...getBackgroundStyles(theme.palette.primary.main, SCROLL_ACTIVE_SIZE),
    },

    "&::-webkit-scrollbar-thumb": {
      ...getBackgroundStyles(theme.palette.primary.light, SCROLL_ACTIVE_SIZE),
    },
  },

  "div": {
    // transition: `color .1s ease`,
    transition: `all .1s ease`,
  },

  /* "::-webkit-scrollbar": {
    width: SCROLL_ACTIVE_SIZE,
    height: SCROLL_ACTIVE_SIZE,

    "&:vertical": getBackgroundStyles(ScrollOrientation.VERTICAL, theme.palette.primary.main),
    "&:horizontal": getBackgroundStyles(ScrollOrientation.HORIZONTAL, theme.palette.primary.main),
  },

  "::-webkit-scrollbar-thumb": {
    "&:vertical": getBackgroundStyles(ScrollOrientation.VERTICAL, theme.palette.primary.light),
    "&:horizontal": getBackgroundStyles(ScrollOrientation.HORIZONTAL, theme.palette.primary.light),
  }, */

  "::-webkit-scrollbar-corner": {
    backgroundColor: `transparent`,
  },

  /* "::-webkit-scrollbar-track": {
    background: getBackground(theme.palette.primary.main),
    borderRadius: BORDER_RADIUS,
  }, */

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
