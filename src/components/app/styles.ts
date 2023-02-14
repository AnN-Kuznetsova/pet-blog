import { darken, Theme } from "@mui/material";


const SCROLL_ACTIVE_SIZE = 30; // px
const SCROLL_VISIBLE_SIZE = 5; // px
const SCROLL_HOVER_SIZE = 10; // px

const getBackgroundStyles = (color: string, size: number) => {
  const borderWidth = (SCROLL_ACTIVE_SIZE - size) / 2;
  const borderStyle = `${borderWidth}px solid transparent`;

  return {
    backgroundColor: `${color}`,
    backgroundClip: `padding-box`,
    border: borderStyle,
    borderRadius: `${borderWidth * 2}px`,
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

  "div": {
    backgroundColor: darken(theme.palette.primary.light, 0.2),
    backgroundClip: `text`,
    transition: `background-color .5s`,

    "&:hover": {
      backgroundColor: theme.palette.primary.light,

      "::-webkit-scrollbar": {
        ...getBackgroundStyles(``, SCROLL_HOVER_SIZE),
      },

      "&::-webkit-scrollbar-thumb": {
        ...getBackgroundStyles(``, SCROLL_HOVER_SIZE),
      },
    },

    "&::-webkit-scrollbar-thumb": {
      backgroundColor: `inherit`,
    },
  },

  "::-webkit-scrollbar-corner": {
    backgroundColor: `transparent`,
  },

  "a": {
    width: "100%",
    textDecoration: "none",
    color: theme.palette.text.primary,

    "&:has(button.Mui-disabled)": {
      pointerEvents: `none` as const,
    },
  },

  ".ReactVirtualized__Grid__innerScrollContainer": {
    width: `5000px !important`,
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
