import { Theme } from "@mui/material";


const SCROLL_ACTIVE_SIZE = 30; // px
const SCROLL_VISIBLE_SIZE = 8; // px

const scrollRadius = SCROLL_VISIBLE_SIZE / 2;

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
  TOP: `50% ${scrollRadius}px`,
  BOTTOM: `50% calc(100% - ${scrollRadius}px)`,
  LEFT: `${scrollRadius}px 50%`,
  RIGHT: `calc(100% - ${scrollRadius}px) 50%`,
};

const getGradients = (mode: GradientMode, positions: string[], color: string) => (
  positions
    .map((position) => {
      if (mode === GradientMode.RADIAL) {
        return `radial-gradient(
          circle closest-side at ${position},
          ${color} ${scrollRadius}px,
          transparent ${scrollRadius}px)
        `;
      }

      return `linear-gradient(
        ${position},
        transparent ${scrollRadius}px,
        ${color} ${scrollRadius}px,
        ${color} calc(100% - ${scrollRadius}px),
        transparent calc(100% - ${scrollRadius}px))
      `;
    })
    .join()
);

const getBackgroundStyles = (orientation: ScrollOrientation, color: string) => {
  const borderStyle = `${SCROLL_ACTIVE_SIZE - SCROLL_VISIBLE_SIZE}px solid transparent`;

  const radialGradientPositions = orientation === ScrollOrientation.VERTICAL ?
    [GradientPosition.TOP, GradientPosition.BOTTOM]
    : [GradientPosition.LEFT, GradientPosition.RIGHT];

  const linearGradientPosition = orientation === ScrollOrientation.VERTICAL ?
    [GradientPosition.TO_BOTTOM] : [GradientPosition.TO_RIGHT];

  const borders = orientation === ScrollOrientation.VERTICAL ? {
    borderLeft: borderStyle,
  } : {
    borderTop: borderStyle,
  };

  return {
    background: `
    ${getGradients(GradientMode.LINEAR, linearGradientPosition, color)},
    ${getGradients(GradientMode.RADIAL, radialGradientPositions, color)}`,
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
