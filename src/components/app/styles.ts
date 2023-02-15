import { Theme } from "@mui/material";

const SCROLL_ACTIVE_SIZE = 20; // px
const SCROLL_VISIBLE_SIZE = 5; // px
const SCROLL_ON_HOVER_SIZE = 10; // px

const SCROLLBAR_CLASS_VERTICAL = `scrollbar-hover--vertical`;
const SCROLLBAR_CLASS_HORIZONTAL = `scrollbar-hover--horizontal`;

let currentScrollElement: HTMLElement | null = null;

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

  if (right && pageX < right && pageX > right - SCROLL_ACTIVE_SIZE) {
    scrollbar.isVertical = true;
  }
  if (bottom && pageY < bottom && pageY > bottom - SCROLL_ACTIVE_SIZE) {
    scrollbar.isHorizontal = true;
  }

  return scrollbar;
};

document.body.addEventListener(`mousemove`, (event) => {
  const element = event.target as HTMLElement;

  if (element !== currentScrollElement) {
    if (currentScrollElement) {
      currentScrollElement.classList.remove(SCROLLBAR_CLASS_VERTICAL, SCROLLBAR_CLASS_HORIZONTAL);
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
      currentScrollElement.classList.add(SCROLLBAR_CLASS_VERTICAL);
    } else {
      currentScrollElement.classList.remove(SCROLLBAR_CLASS_VERTICAL);
    }

    if (scrollbarParams.isHorizontal) {
      currentScrollElement.classList.add(SCROLLBAR_CLASS_HORIZONTAL);
    } else {
      currentScrollElement.classList.remove(SCROLLBAR_CLASS_HORIZONTAL);
    }
  }
});

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

  ".scrollbar-hover": {
    "&--vertical": {
      "&::-webkit-scrollbar:vertical": {
        ...getBackgroundStyles(theme.palette.primary.main, SCROLL_ON_HOVER_SIZE),
      },
      "&::-webkit-scrollbar-thumb:vertical": {
        ...getBackgroundStyles(theme.palette.primary.light, SCROLL_ON_HOVER_SIZE),
      },
    },

    "&--horizontal": {
      "&::-webkit-scrollbar:horizontal": {
        ...getBackgroundStyles(theme.palette.primary.main, SCROLL_ON_HOVER_SIZE),
      },
      "&::-webkit-scrollbar-thumb:horizontal": {
        ...getBackgroundStyles(theme.palette.primary.light, SCROLL_ON_HOVER_SIZE),
      },
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
