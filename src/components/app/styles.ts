import { Theme } from "@mui/material";


const SCROLL_ACTIVE_SIZE = 10; // px
const SCROLL_VISIBLE_SIZE = 5; // px

enum ScrollOrientation {
  VERTICAL,
  HORIZONTAL,
}

enum GradientMode {
  LINEAR,
  RADIAL,
}

const getGradientPosition = (orientation: ScrollOrientation, mode: GradientMode, size: number) => {
  const radius = size / 2;

  const position = {
    TO_RIGHT: `to right`,
    TO_BOTTOM: `to bottom`,
    TOP: `50% ${radius}px`,
    BOTTOM: `50% calc(100% - ${radius}px)`,
    LEFT: `${radius}px 50%`,
    RIGHT: `calc(100% - ${radius}px) 50%`,
  };

  if (mode === GradientMode.LINEAR) {
    return orientation === ScrollOrientation.VERTICAL ?
      [position.TO_BOTTOM] : [position.TO_RIGHT];
  }

  if (mode === GradientMode.RADIAL) {
    return orientation === ScrollOrientation.VERTICAL ?
      [position.TOP, position.BOTTOM]
      : [position.LEFT, position.RIGHT];
  }
  return [];
};

const getGradients = (mode: GradientMode, positions: string[], color: string, size: number) => {
  const radius = size / 2;

  return positions
    .map((position) => {
      if (mode === GradientMode.RADIAL) {
        return `radial-gradient(
          circle closest-side at ${position},
          ${color} ${radius}px,
          transparent ${radius}px)
        `;
      }

      return `linear-gradient(
        ${position},
        transparent ${radius}px,
        ${color} ${radius}px,
        ${color} calc(100% - ${radius}px),
        transparent calc(100% - ${radius}px))
      `;
    })
    .join();
};

const getBackgroundStyles = (orientation: ScrollOrientation, color: string, size: number) => {
  const borderStyle = `${SCROLL_ACTIVE_SIZE - size}px solid transparent`;
  const radialGradientPositions = getGradientPosition(orientation, GradientMode.RADIAL, size);
  const linearGradientPosition = getGradientPosition(orientation, GradientMode.LINEAR, size);

  const borders = orientation === ScrollOrientation.VERTICAL ? {
    borderLeft: borderStyle,
  } : {
    borderTop: borderStyle,
  };

  return {
    background: `
      ${getGradients(GradientMode.RADIAL, radialGradientPositions, color, size)},
      ${getGradients(GradientMode.LINEAR, linearGradientPosition, color, size)}`,
    backgroundClip: `padding-box`,
    ...borders,
  };
};

const globalStyles = (theme: Theme) => ({
  "*::-webkit-scrollbar": {
    width: SCROLL_ACTIVE_SIZE,
    height: SCROLL_ACTIVE_SIZE,

    "&:vertical": getBackgroundStyles(ScrollOrientation.VERTICAL, theme.palette.primary.main, SCROLL_VISIBLE_SIZE),
  },

  "*::-webkit-scrollbar-thumb": {
    "&:vertical": getBackgroundStyles(ScrollOrientation.VERTICAL, theme.palette.primary.light, SCROLL_VISIBLE_SIZE),
  },

  "div:hover": {
    color: theme.palette.primary.light,

    "&::-webkit-scrollbar": {
      "&:vertical": getBackgroundStyles(ScrollOrientation.VERTICAL, theme.palette.primary.main, SCROLL_ACTIVE_SIZE),
    },

    "&::-webkit-scrollbar-thumb": {
      "&:vertical": getBackgroundStyles(ScrollOrientation.VERTICAL, theme.palette.primary.light, SCROLL_ACTIVE_SIZE),
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
  },

  "::-webkit-scrollbar-corner": {
    backgroundColor: `transparent`,
  }, */

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
