import { Theme } from "@mui/material";


const SCROLL_ACTIVE_SIZE = 20; // px
const SCROLL_VISIBLE_SIZE = 6; // px

enum ScrollOrientation {
  VERTICAL,
  HORIZONTAL,
}

const getSvgBG = (color: string, size: number) => (
  `url('data:image/svg+xml,\
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100% 100%">\
      <g fill="${color}">\
        <rect x="0" y="0"\
          width="100%" height="100%"\
          rx="${size / 2}" ry="${size / 2}"/>\
      </g>\
    </svg>'
  )`
);

const getBackgroundStyles = (orientation: ScrollOrientation, color: string) => {
  const borderStyle = `${SCROLL_ACTIVE_SIZE - SCROLL_VISIBLE_SIZE}px solid transparent`;

  const borders = orientation === ScrollOrientation.VERTICAL ? {
    borderLeft: borderStyle,
  } : {
    borderTop: borderStyle,
  };

  return {
    background: `${getSvgBG(color, SCROLL_VISIBLE_SIZE)} no-repeat`,
    backgroundClip: `padding-box`,
    ...borders,
  };
};

const globalStyles = (theme: Theme) => ({
  "::-webkit-scrollbar": {
    width: SCROLL_ACTIVE_SIZE,
    height: SCROLL_ACTIVE_SIZE,

    "&:vertical": getBackgroundStyles(ScrollOrientation.VERTICAL, theme.palette.primary.main),
    "&:horizontal": getBackgroundStyles(ScrollOrientation.HORIZONTAL, theme.palette.primary.main),
  },

  "::-webkit-scrollbar-thumb": {
    "&:vertical": getBackgroundStyles(ScrollOrientation.VERTICAL, theme.palette.primary.light),
    "&:horizontal": getBackgroundStyles(ScrollOrientation.HORIZONTAL, theme.palette.primary.light),
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
