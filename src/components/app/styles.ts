import { Theme } from "@mui/material";

// import { BORDER_RADIUS } from "../../helpers/constants";


// const BORDER_RADIUS = `47%`;


const SCROLL_SIZE = 40; // px
const SCROLL_RADIUS = 4; // px - половина ширины видимой части

const borderWidth = SCROLL_SIZE / 2 - SCROLL_RADIUS;

enum ScrollOrientation {
  VERTICAL,
  HORIZONTAL,
}

enum GradientMode {
  LINEAR,
  RADIAL,
}

const GradientPosition = {
  TO_RIGHT: `to right`,
  TO_BOTTOM: `to bottom`,
  TOP: `50% ${SCROLL_RADIUS}px`,
  BOTTOM: `50% calc(100% - ${SCROLL_RADIUS}px)`,
  LEFT: `${SCROLL_RADIUS}px 50%`,
  RIGHT: `calc(100% - ${SCROLL_RADIUS}px) 50%`,
};

const getGradients = (mode: GradientMode, positions: string[], color: string) => (
  positions
    .map((position) => {
      if (mode === GradientMode.RADIAL) {
        return `radial-gradient(circle closest-side at ${position}, ${color} ${SCROLL_RADIUS}px, transparent ${SCROLL_RADIUS}px)`;
      }

      return `linear-gradient(${position}, transparent ${SCROLL_RADIUS}px, ${color} ${SCROLL_RADIUS}px, ${color} calc(100% - ${SCROLL_RADIUS}px), transparent calc(100% - ${SCROLL_RADIUS}px))`;
    })
    .join()
);

const getBackgroundStyles = (orientation: ScrollOrientation, color: string) => {
  const radialGradientPositions = orientation === ScrollOrientation.VERTICAL ?
    [GradientPosition.TOP, GradientPosition.BOTTOM]
    : [GradientPosition.LEFT, GradientPosition.RIGHT];

  const linearGradientPosition = orientation === ScrollOrientation.VERTICAL ?
    [GradientPosition.TO_BOTTOM] : [GradientPosition.TO_RIGHT];

  const borders = orientation === ScrollOrientation.VERTICAL ?
    {
      borderTop: `none`,
      borderBottom: `none`,
    }
    : {
      borderLeft: `none`,
      borderRight: `none`,
    };

  return {
    background: `
      ${getGradients(GradientMode.LINEAR, linearGradientPosition, color)},
      ${getGradients(GradientMode.RADIAL, radialGradientPositions, color)}`,
    ...borders,
    backgroundClip: `padding-box`,
  };
};

const globalStyles = (theme: Theme) => ({
  "::-webkit-scrollbar": {
    width: SCROLL_SIZE,
    height: SCROLL_SIZE,
    border: `${borderWidth}px solid transparent`,

    "&:vertical": getBackgroundStyles(ScrollOrientation.VERTICAL, theme.palette.primary.main),
    "&:horizontal": getBackgroundStyles(ScrollOrientation.HORIZONTAL, theme.palette.primary.main),
  },

  "::-webkit-scrollbar-thumb": {
    border: `${borderWidth}px solid transparent`,

    "&:vertical": getBackgroundStyles(ScrollOrientation.VERTICAL, theme.palette.primary.light),
    "&:horizontal": getBackgroundStyles(ScrollOrientation.HORIZONTAL, theme.palette.primary.light),
  },

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
