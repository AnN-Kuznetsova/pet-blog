import { Theme } from "@mui/material";


const SCROLL_ACTIVE_SIZE = 20; // px
const SCROLL_VISIBLE_SIZE = 6; // px
const SCROLLBAR_REST_OPACITY = 0.5;

enum ScrollOrientation {
  VERTICAL,
  HORIZONTAL,
}

const getSvgBG = (color: string, size: number, opacity: number) => (
  `url('data:image/svg+xml,\
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100% 100%">\
      <g fill="${color}" opacity="${opacity}">\
        <rect x="0" y="0"\
          width="100%" height="100%"\
          rx="${size / 2}" ry="${size / 2}"/>\
      </g>\
    </svg>'
  )`
);

const getBackgroundStyles = (orientation: ScrollOrientation, color: string, isHover: boolean) => {
  const opacity = isHover ? 1 : SCROLLBAR_REST_OPACITY;
  const borderStyle = `${SCROLL_ACTIVE_SIZE - SCROLL_VISIBLE_SIZE}px solid transparent`;

  const borders = orientation === ScrollOrientation.VERTICAL ? {
    borderLeft: borderStyle,
  } : {
    borderTop: borderStyle,
  };

  return {
    background: `${getSvgBG(color, SCROLL_VISIBLE_SIZE, opacity)} no-repeat`,
    backgroundClip: `padding-box`,
    ...borders,
  };
};

const globalStyles = (theme: Theme) => ({
  "*::-webkit-scrollbar": {
    width: SCROLL_ACTIVE_SIZE,
    height: SCROLL_ACTIVE_SIZE,

    "&:vertical": getBackgroundStyles(ScrollOrientation.VERTICAL, theme.palette.primary.main, false),
    "&:horizontal": getBackgroundStyles(ScrollOrientation.HORIZONTAL, theme.palette.primary.main, false),
  },

  "*::-webkit-scrollbar-thumb": {
    "&:vertical": getBackgroundStyles(ScrollOrientation.VERTICAL, theme.palette.primary.light, false),
    "&:horizontal": getBackgroundStyles(ScrollOrientation.HORIZONTAL, theme.palette.primary.light, false),
  },

  "*:hover": {
    "&::-webkit-scrollbar": {
      "&:vertical": getBackgroundStyles(ScrollOrientation.VERTICAL, theme.palette.primary.main, true),
      "&:horizontal": getBackgroundStyles(ScrollOrientation.HORIZONTAL, theme.palette.primary.main, true),
    },

    "&::-webkit-scrollbar-thumb": {
      "&:vertical": getBackgroundStyles(ScrollOrientation.VERTICAL, theme.palette.primary.light, true),
      "&:horizontal": getBackgroundStyles(ScrollOrientation.HORIZONTAL, theme.palette.primary.light, true),
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
