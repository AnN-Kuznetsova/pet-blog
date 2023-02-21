import { Theme } from "@mui/material";


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

let currentScrollElement: HTMLElement | null = null;

document.body.addEventListener(`mousemove`, (event) => {
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
      pageX: event.pageX,
      pageY: event.pageY,
    };

    const scrollbarParams = getScrollbarParams(elementParams, pageParams);


    if (scrollbarParams.isVertical) {
      currentScrollElement.classList.add(ScrollbarHoverClass.VERTICAL);
    } else {
      currentScrollElement.classList.remove(ScrollbarHoverClass.VERTICAL);
    }

    if (scrollbarParams.isHorizontal) {
      currentScrollElement.classList.add(ScrollbarHoverClass.HORIZONTAL);
    } else {
      currentScrollElement.classList.remove(ScrollbarHoverClass.HORIZONTAL);
    }
  }
});

const getScrollbarParams = (
  elementParams: {
    right: number;
    bottom: number;
  },
  pageParams: {
    pageX: number;
    pageY: number;
  }
): {
  isVertical: boolean;
  isHorizontal: boolean;
} => {
  const {right, bottom} = elementParams;
  const {pageX, pageY} = pageParams;

  const scrollbar = {
    isVertical: false,
    isHorizontal: false,
  };

  if (right && pageX < right && pageX > right - ScrollSize.ACTIVE) {
    scrollbar.isVertical = true;
  }
  if (bottom && pageY < bottom && pageY > bottom - ScrollSize.ACTIVE) {
    scrollbar.isHorizontal = true;
  }

  return scrollbar;
};

const getBackgroundStyles = ({orientation, color, isHover}: {
  orientation: ScrollOrientation;
  color: string;
  isHover: boolean;
}) => {
  const size = isHover ? ScrollSize.HOVER : ScrollSize.VISIBLE;
  const opacity = isHover ? 1 : SCROLLBAR_REST_OPACITY;
  const borderStyle = `${(ScrollSize.ACTIVE - size) / 2}px solid transparent`;

  const borders = orientation === ScrollOrientation.VERTICAL ? {
    borderLeft: borderStyle,
    borderRight: borderStyle,
  } : {
    borderTop: borderStyle,
    borderBottom: borderStyle,
  };

  return {
    background: `${getSvgBG(color, size, opacity)} no-repeat`,
    backgroundClip: `padding-box`,
    ...borders,
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

  ".scrollbar-hover": {
    "&--vertical": {
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

    "&--horizontal": {
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
