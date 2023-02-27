import type { Theme } from "@mui/material";


const ScrollSize = {
  ACTIVE: 30, // px
  VISIBLE: 7, // px
  HOVER: 20, // px
};

const SCROLLBAR_ANIMATION_TIME = 30; // ms
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
    pageX: number;
    pageY: number;
  }
): {
  isVerticalScroll: boolean;
  isHorizontalScroll: boolean;
} => {
  const {right, bottom} = elementParams;
  const {pageX, pageY} = pageParams;

  const scrollbar = {
    isVerticalScroll: false,
    isHorizontalScroll: false,
  };

  if (right && pageX < right && pageX > right - ScrollSize.ACTIVE) {
    scrollbar.isVerticalScroll = true;
  }
  if (bottom && pageY < bottom && pageY > bottom - ScrollSize.ACTIVE) {
    scrollbar.isHorizontalScroll = true;
  }

  return scrollbar;
};

const controlScrollClass = (scrollElement: HTMLElement, isScroll: boolean, className: string) => {
  if (scrollElement) {
    if (isScroll) {
      scrollElement.classList.add(className);
    } else {
      scrollElement.classList.remove(className);
    }
  }
};

enum AnimationDirection {
  IN,
  OUT,
}

let currentScrollElement: HTMLElement | null = null;

/* document.body.addEventListener(`mousemove`, (event) => {
  const element = event.target as HTMLElement;

  if (element !== currentScrollElement) {
    if (currentScrollElement) {
      currentScrollElement.classList.remove(ScrollbarHoverClass.VERTICAL, ScrollbarHoverClass.HORIZONTAL);
    }

    currentScrollElement = element;
  }

  const params = element.getBoundingClientRect();

  const elementParams = {
    right: params.right,
    bottom: params.bottom,
  };

  const pageParams = {
    pageX: event.pageX,
    pageY: event.pageY,
  };

  const {isVerticalScroll, isHorizontalScroll} = getScrollbarParams(elementParams, pageParams);
  // controlScrollClass(isVerticalScroll, ScrollbarHoverClass.VERTICAL);
  // controlScrollClass(isHorizontalScroll, ScrollbarHoverClass.HORIZONTAL);

  if (isVerticalScroll) {
    element.setAttribute(`data-is-scroll-hover`, `true`);
    animateScrollIn(element);
  } else {
    element.setAttribute(`data-is-scroll-hover`, `false`);
    animateScrollOut(element);
  }
}); */
document.body.addEventListener(`mousemove`, (event) => {
  const element = event.target as HTMLElement;

  if (element !== currentScrollElement) {
    if (currentScrollElement) {
      currentScrollElement.setAttribute(`data-is-scroll-hover`, `false`);
      animateScroll(currentScrollElement);
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

    const {isVerticalScroll, isHorizontalScroll} = getScrollbarParams(elementParams, pageParams);
    // controlScrollClass(isVerticalScroll, ScrollbarHoverClass.VERTICAL);
    // controlScrollClass(isHorizontalScroll, ScrollbarHoverClass.HORIZONTAL);

    if (isVerticalScroll && currentScrollElement.dataset.isScrollHover !== `true`) {
      currentScrollElement.setAttribute(`data-is-scroll-hover`, `true`);
      animateScroll(currentScrollElement);
    }
    if (!isVerticalScroll && currentScrollElement.dataset.isScrollHover === `true`) {
      currentScrollElement.setAttribute(`data-is-scroll-hover`, `false`);
      animateScroll(currentScrollElement);
    }
  }
});

const animateScroll = (scrollElement: HTMLElement) => {
  const classIndex = scrollElement.dataset.classIndex ? +scrollElement.dataset.classIndex : 0;
  let index = typeof classIndex === `number` ? classIndex : 0;

  const intervalID = setInterval(() => {
    if (scrollElement.dataset.isScrollHover === `true` && index < scrollClassNames.length) {
      scrollElement.classList.remove(scrollClassNames[index - 1]);
      scrollElement.classList.add(scrollClassNames[index]);
      scrollElement.setAttribute(`data-class-index`, `${index}`);
      index++;
    } else if (scrollElement.dataset.isScrollHover === `false` && index > 0) {
      scrollElement.classList.remove(scrollClassNames[index]);
      index--;
      scrollElement.classList.add(scrollClassNames[index]);
      scrollElement.setAttribute(`data-class-index`, `${index}`);
    } else {
      clearInterval(intervalID);
    }
  }, SCROLLBAR_ANIMATION_TIME);
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

const getBackgroundStyles = ({orientation, color, isHover, size}: {
  orientation: ScrollOrientation;
  color: string;
  isHover: boolean;
  size: number;
}) => {
  // const size = isHover ? ScrollSize.HOVER : ScrollSize.VISIBLE;
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

// /////////////////////////////

const steps = [1,2,3,4,5,6,7,8,9,10];// new Array(10);
const scrollSizeStep = (ScrollSize.HOVER - ScrollSize.VISIBLE) / (steps.length - 1);

const scrollClassNames = steps.map((step, index) => {
  return `scrollbar-hover--${index}`;
});

const scrollHoverStyles = scrollClassNames.map((className, index) => {
  const size = ScrollSize.VISIBLE + scrollSizeStep * index;

  return {
    [`.${className}`]: {
      "&::-webkit-scrollbar:vertical": getBackgroundStyles({
        orientation: ScrollOrientation.VERTICAL,
        color: `yellow`, // theme.palette.primary.main,
        isHover: true,
        size,
      }),

      "&::-webkit-scrollbar-thumb:vertical": getBackgroundStyles({
        orientation: ScrollOrientation.VERTICAL,
        color: `white`, // theme.palette.primary.light,
        isHover: true,
        size,
      }),
    },
  };
}).reduce((accum, styles) => {
  const style = Object.entries(styles);

  return {
    ...accum,
    ...Object.fromEntries(style),
  };
}, {});

// ////////////////////////////

const globalStyles = (theme: Theme) => ({
  "*::-webkit-scrollbar": {
    width: ScrollSize.ACTIVE,
    height: ScrollSize.ACTIVE,

    "&:vertical": getBackgroundStyles({
      orientation: ScrollOrientation.VERTICAL,
      color: theme.palette.primary.main,
      isHover: false,
      size: ScrollSize.VISIBLE,
    }),

    "&:horizontal": getBackgroundStyles({
      orientation: ScrollOrientation.HORIZONTAL,
      color: theme.palette.primary.main,
      isHover: false,
      size: ScrollSize.VISIBLE,
    }),
  },

  "*::-webkit-scrollbar-thumb": {
    "&:vertical": getBackgroundStyles({
      orientation: ScrollOrientation.VERTICAL,
      color: theme.palette.primary.light,
      isHover: false,
      size: ScrollSize.VISIBLE,
    }),

    "&:horizontal": getBackgroundStyles({
      orientation: ScrollOrientation.HORIZONTAL,
      color: theme.palette.primary.light,
      isHover: false,
      size: ScrollSize.VISIBLE,
    }),
  },

  ...scrollHoverStyles,

  /* [`.${ScrollbarHoverClass.VERTICAL}`]: {
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
  }, */

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
