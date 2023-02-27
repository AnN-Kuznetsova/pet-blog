import { THEME } from "../../helpers/theme";
import type { Theme } from "@mui/material";


const ScrollParams = {
  Size: {
    ACTIVE: 30, // px
    VISIBLE: 6, // px
    HOVER: 20, // px
  },
  Color: {
    SCROLLBAR: THEME.palette.primary.main,
    THUMB: THEME.palette.primary.light,
  },
  OPACITY_IN_REST: 0.5,
};

const ScrollAnimationParams = {
  DURATION: 300, // ms
  FPS: 24,
};

// ///////////////////////////////////////////////////////

enum ScrollOrientation {
  VERTICAL,
  HORIZONTAL,
}

const ScrollbarHoverClass = {
  VERTICAL: `scrollbar--vertical`,
  HORIZONTAL: `scrollbar--horizontal`,
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

  if (right && pageX < right && pageX > right - ScrollParams.Size.ACTIVE) {
    scrollbar.isVerticalScroll = true;
  }
  if (bottom && pageY < bottom && pageY > bottom - ScrollParams.Size.ACTIVE) {
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

const scrollAnimationFramesCount = Math.ceil(ScrollAnimationParams.FPS * ScrollAnimationParams.DURATION / 1000);
const animationInterval = ScrollAnimationParams.DURATION / scrollAnimationFramesCount;
const scrollSizeStep = (ScrollParams.Size.HOVER - ScrollParams.Size.VISIBLE) / (scrollAnimationFramesCount - 1);
const scrollOpacityStep = (1 - ScrollParams.OPACITY_IN_REST) / (scrollAnimationFramesCount - 1);
const scrollClassNames = Array(scrollAnimationFramesCount).fill(null).map((step, index) => {
  return `scrollbar--${index}`;
});

let currentScrollElement: HTMLElement | null = null;

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
  const intervalID = setInterval(() => {
    const classIndex = scrollElement.dataset.classIndex ? +scrollElement.dataset.classIndex : 0;
    const index = typeof classIndex === `number` ? classIndex : 0;
    let nextIndex: number | null = null;

    if (scrollElement.dataset.isScrollHover === `true` && index < scrollClassNames.length - 1) {
      nextIndex = index + 1;
    } else if (scrollElement.dataset.isScrollHover === `false` && index > 0) {
      nextIndex = index - 1;
    }

    if (nextIndex !== null) {
      scrollElement.classList.remove(scrollClassNames[index]);
      scrollElement.classList.add(scrollClassNames[nextIndex]);
      scrollElement.setAttribute(`data-class-index`, `${nextIndex}`);
    } else {
      clearInterval(intervalID);
    }
  }, animationInterval);
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

const getBackgroundStyles = ({orientation, color, index}: {
  orientation: ScrollOrientation;
  color: string;
  index: number;
}) => {
  const size = ScrollParams.Size.VISIBLE + scrollSizeStep * index;
  const opacity = ScrollParams.OPACITY_IN_REST + scrollOpacityStep * index;
  const borderWidth = `${(ScrollParams.Size.ACTIVE - size) / 2}px`;
  const borderStyle = orientation === ScrollOrientation.VERTICAL ? `none solid` : `solid none`;

  return {
    background: `${getSvgBG(color, size, opacity)} no-repeat`,
    backgroundClip: `padding-box`,
    borderWidth,
    borderColor: `transparent`,
    borderStyle,
  };
};

const scrollStyles = scrollClassNames.map((className, index) => {
  return {
    [`.${className}`]: {
      "&::-webkit-scrollbar": {
        "&:vertical": getBackgroundStyles({
          orientation: ScrollOrientation.VERTICAL,
          color: ScrollParams.Color.SCROLLBAR,
          index,
        }),

        "&:horizontal": getBackgroundStyles({
          orientation: ScrollOrientation.HORIZONTAL,
          color: ScrollParams.Color.SCROLLBAR,
          index,
        }),
      },

      "&::-webkit-scrollbar-thumb": {
        "&:vertical": getBackgroundStyles({
          orientation: ScrollOrientation.VERTICAL,
          color: ScrollParams.Color.THUMB,
          index,
        }),

        "&:horizontal": getBackgroundStyles({
          orientation: ScrollOrientation.HORIZONTAL,
          color: ScrollParams.Color.THUMB,
          index,
        }),
      },
    },
  };
}).reduce((accum, styles) => {
  const style = Object.entries(styles);

  return {
    ...accum,
    ...Object.fromEntries(style),
  };
}, {});

const globalStyles = (theme: Theme) => ({
  "*::-webkit-scrollbar": {
    width: ScrollParams.Size.ACTIVE,
    height: ScrollParams.Size.ACTIVE,

    ...scrollStyles[`.scrollbar--0`][`&::-webkit-scrollbar`],
  },

  "*::-webkit-scrollbar-thumb": {
    ...scrollStyles[`.scrollbar--0`][`&::-webkit-scrollbar-thumb`],
  },

  ...scrollStyles,

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
