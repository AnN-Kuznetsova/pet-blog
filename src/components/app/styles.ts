import type { Theme } from "@mui/material";


const ScrollSize = {
  ACTIVE: 20, // px
  VISIBLE: 5, // px
  HOVER: 10, // px
};

const SCROLLBAR_REST_OPACITY = 0.5;

enum ScrollOrientation {
  VERTICAL,
  HORIZONTAL,
}

const ScrollbarHoverClass = {
  VERTICAL: `scrollbar-hover--vertical`,
  HORIZONTAL: `scrollbar-hover--horizontal`,
};

const getScrollbarParams = (
  elementParams: {
    right: number;
    bottom: number;
  },
  pageParams: {
    clientX: number;
    clientY: number;
  }
): {
  isVerticalScroll: boolean;
  isHorizontalScroll: boolean;
} => {
  const {right, bottom} = elementParams;
  const {clientX, clientY} = pageParams;

  const scrollbar = {
    isVerticalScroll: false,
    isHorizontalScroll: false,
  };

  if (right && clientX < right && clientX > right - ScrollSize.ACTIVE) {
    scrollbar.isVerticalScroll = true;
  }
  if (bottom && clientY < bottom && clientY > bottom - ScrollSize.ACTIVE) {
    scrollbar.isHorizontalScroll = true;
  }

  return scrollbar;
};

const controlScrollClass = (isScroll: boolean, className: string) => {
  if (currentScrollElement) {
    if (isScroll) {
      currentScrollElement.classList.add(className);
    } else {
      currentScrollElement.classList.remove(className);
    }
  }
};

let currentScrollElement: HTMLElement | null = null;

document.documentElement.addEventListener(`mousemove`, (event) => {
  const element = event.target as HTMLElement;

  if (element !== currentScrollElement) {
    if (currentScrollElement) {
      currentScrollElement.classList.remove(ScrollbarHoverClass.VERTICAL, ScrollbarHoverClass.HORIZONTAL);
    }

    currentScrollElement = element;
  }

  if (currentScrollElement) {
    const params = currentScrollElement.getBoundingClientRect();

    const elementParams = {
      right: params.right,
      bottom: params.bottom,
    };

    const pageParams = {
      clientX: event.clientX,
      clientY: event.clientY,
    };

    const {isVerticalScroll, isHorizontalScroll} = getScrollbarParams(elementParams, pageParams);
    controlScrollClass(isVerticalScroll, ScrollbarHoverClass.VERTICAL);
    controlScrollClass(isHorizontalScroll, ScrollbarHoverClass.HORIZONTAL);
  }
});

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

const getBackgroundStyles = ({orientation, color, isHover}: {
  orientation: ScrollOrientation;
  color: string;
  isHover: boolean;
}) => {
  const size = isHover ? ScrollSize.HOVER : ScrollSize.VISIBLE;
  const opacity = isHover ? 1 : SCROLLBAR_REST_OPACITY;
  const borderWidth = `${(ScrollSize.ACTIVE - size) / 2}px`;
  const borderStyle = orientation === ScrollOrientation.VERTICAL ? `none solid` : `solid none`;

  return {
    background: `${getSvgBG(color, size, opacity)} no-repeat`,
    backgroundClip: `padding-box`,
    borderWidth,
    borderColor: `transparent`,
    borderStyle,
  };
};

const globalStyles = (theme: Theme) => ({
  "*::-webkit-scrollbar": {
    width: ScrollSize.ACTIVE,
    height: ScrollSize.ACTIVE,

    "&:vertical": getBackgroundStyles({
      orientation: ScrollOrientation.VERTICAL,
      color: theme.palette.primary.main,
      isHover: false,
    }),

    "&:horizontal": getBackgroundStyles({
      orientation: ScrollOrientation.HORIZONTAL,
      color: theme.palette.primary.main,
      isHover: false,
    }),
  },

  "*::-webkit-scrollbar-thumb": {
    "&:vertical": getBackgroundStyles({
      orientation: ScrollOrientation.VERTICAL,
      color: theme.palette.primary.light,
      isHover: false,
    }),

    "&:horizontal": getBackgroundStyles({
      orientation: ScrollOrientation.HORIZONTAL,
      color: theme.palette.primary.light,
      isHover: false,
    }),
  },

  [`.${ScrollbarHoverClass.VERTICAL}`]: {
    "&::-webkit-scrollbar:vertical": getBackgroundStyles({
      orientation: ScrollOrientation.VERTICAL,
      color: theme.palette.primary.main,
      isHover: true,
    }),

    "&::-webkit-scrollbar-thumb:vertical": getBackgroundStyles({
      orientation: ScrollOrientation.VERTICAL,
      color: theme.palette.primary.light,
      isHover: true,
    }),
  },

  [`.${ScrollbarHoverClass.HORIZONTAL}`]: {
    "&::-webkit-scrollbar:horizontal": getBackgroundStyles({
      orientation: ScrollOrientation.HORIZONTAL,
      color: theme.palette.primary.main,
      isHover: true,
    }),

    "&::-webkit-scrollbar-thumb:horizontal": getBackgroundStyles({
      orientation: ScrollOrientation.HORIZONTAL,
      color: theme.palette.primary.light,
      isHover: true,
    }),
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
