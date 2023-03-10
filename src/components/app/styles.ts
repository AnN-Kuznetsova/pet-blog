import { THEME } from "../../helpers/theme";
import type { Theme } from "@mui/material";


const ScrollParams = {
  Size: {
    ACTIVE: 20, // px
    VISIBLE: 6, // px
    HOVER: 11, // px
  },
  Color: {
    SCROLLBAR: THEME.palette.primary.main,
    THUMB: THEME.palette.primary.light,
  },
  OPACITY_IN_REST: 0.5,
};

const ScrollAnimationParams = {
  DURATION: 200, // ms
  FPS: 24,
  FRAMES_COUNT_SIZE_RELATION: 0.3, // подобрано опытным путём - компромисс между плавностью и количеством кадров
};

// ///////////////////////////////////////////////////////

const SCROLLBAR_CLASS = `scrollbar`;

enum ScrollOrientation {
  VERTICAL = `vertical`,
  HORIZONTAL = `horizontal`,
}

enum ScrollAnimationDirection {
  IN,
  OUT,
}

const scrollAnimationFramesCount = Math.ceil(
  ScrollAnimationParams.FPS * ScrollAnimationParams.DURATION / 1000 *
  (ScrollParams.Size.HOVER - ScrollParams.Size.VISIBLE) * ScrollAnimationParams.FRAMES_COUNT_SIZE_RELATION
);
const animationTimeInterval = ScrollAnimationParams.DURATION / scrollAnimationFramesCount;
const scrollSizeStep = (ScrollParams.Size.HOVER - ScrollParams.Size.VISIBLE) / (scrollAnimationFramesCount - 1);
const scrollOpacityStep = (1 - ScrollParams.OPACITY_IN_REST) / (scrollAnimationFramesCount - 1);

const scrollAnimatedElements: {
  [ScrollOrientation.VERTICAL]: Map<HTMLElement, ScrollAnimationDirection>;
  [ScrollOrientation.HORIZONTAL]: Map<HTMLElement, ScrollAnimationDirection>;
} = {
  [ScrollOrientation.VERTICAL]: new Map(),
  [ScrollOrientation.HORIZONTAL]: new Map(),
};

let currentScrollElement: HTMLElement | null = null;

const getScrollClassNames = (orientation: ScrollOrientation) => {
  return Array(scrollAnimationFramesCount).fill(null).map((step, index) => {
    return `${SCROLLBAR_CLASS}-${orientation}--${index}`;
  });
};

const scrollClassNames = {
  [ScrollOrientation.VERTICAL]: getScrollClassNames(ScrollOrientation.VERTICAL),
  [ScrollOrientation.HORIZONTAL]: getScrollClassNames(ScrollOrientation.HORIZONTAL),
};

const scrollClassNamesFoFF = Array(scrollAnimationFramesCount).fill(null).map((step, index) => {
  return `${SCROLLBAR_CLASS}-FF--${index}`;
});

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
  [ScrollOrientation.VERTICAL]: boolean;
  [ScrollOrientation.HORIZONTAL]: boolean;
} => {
  const {right, bottom} = elementParams;
  const {clientX, clientY} = pageParams;

  const scrollIsHover = {
    [ScrollOrientation.VERTICAL]: false,
    [ScrollOrientation.HORIZONTAL]: false,
  };

  if (right && clientX < right && clientX > right - ScrollParams.Size.ACTIVE) {
    scrollIsHover[ScrollOrientation.VERTICAL] = true;
  }
  if (bottom && clientY < bottom && clientY > bottom - ScrollParams.Size.ACTIVE) {
    scrollIsHover[ScrollOrientation.HORIZONTAL] = true;
  }

  return scrollIsHover;
};

const controlScrollAnimation = (element: HTMLElement, orientation: ScrollOrientation, isScrollHover: boolean) => {
  const isElementAnimated = scrollAnimatedElements[orientation].has(element);
  const currentAnimationDirection = isElementAnimated ? scrollAnimatedElements[orientation].get(element) : ScrollAnimationDirection.OUT;

  if (isScrollHover && currentAnimationDirection === ScrollAnimationDirection.OUT) {
    scrollAnimatedElements[orientation].set(element, ScrollAnimationDirection.IN);

    if (!isElementAnimated) {
      animateScroll(element, orientation, 0);
    }
  }

  if (!isScrollHover && currentAnimationDirection === ScrollAnimationDirection.IN) {
    scrollAnimatedElements[orientation].set(element, ScrollAnimationDirection.OUT);
  }
};

const animateScroll = (scrollElement: HTMLElement, orientation: ScrollOrientation, index: number) => {
  const currentAnimationDirection = scrollAnimatedElements[orientation].get(scrollElement);
  let nextIndex = index;

  if (currentAnimationDirection === ScrollAnimationDirection.IN && index < scrollClassNames[orientation].length - 1) {
    nextIndex = index + 1;
  } else if (currentAnimationDirection === ScrollAnimationDirection.OUT && index > 0) {
    nextIndex = index - 1;
  }

  if (nextIndex !== index) {
    scrollElement.classList.remove(scrollClassNames[orientation][index], scrollClassNamesFoFF[index]);
    scrollElement.classList.add(scrollClassNames[orientation][nextIndex], scrollClassNamesFoFF[nextIndex]);
  }

  if (currentAnimationDirection === ScrollAnimationDirection.IN ||
    (currentAnimationDirection === ScrollAnimationDirection.OUT && nextIndex !== 0)) {
    setTimeout(() => {
      animateScroll(scrollElement, orientation, nextIndex);
    }, animationTimeInterval);
  } else {
    scrollAnimatedElements[orientation].delete(scrollElement);
  }
};

document.body.addEventListener(`mousemove`, (event) => {
  const element = event.target as HTMLElement;

  if (element !== currentScrollElement) {
    if (currentScrollElement) {
      controlScrollAnimation(currentScrollElement, ScrollOrientation.VERTICAL, false);
      controlScrollAnimation(currentScrollElement, ScrollOrientation.HORIZONTAL, false);
    }

    currentScrollElement = element;
  }

  if (currentScrollElement && (
    currentScrollElement.clientHeight < currentScrollElement.scrollHeight ||
    currentScrollElement.clientWidth < currentScrollElement.scrollWidth
  )) {
    const params = currentScrollElement.getBoundingClientRect();

    const elementParams = {
      right: params.right,
      bottom: params.bottom,
    };

    const pageParams = {
      clientX: event.clientX,
      clientY: event.clientY,
    };

    const {
      [ScrollOrientation.VERTICAL]: isVerticalScroll,
      [ScrollOrientation.HORIZONTAL]: isHorizontalScroll,
    } = getScrollbarParams(elementParams, pageParams);

    controlScrollAnimation(currentScrollElement, ScrollOrientation.VERTICAL, isVerticalScroll);
    controlScrollAnimation(currentScrollElement, ScrollOrientation.HORIZONTAL, isHorizontalScroll);
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

// -webkit
const getScrollStyles = (orientation: ScrollOrientation) => {
  return scrollClassNames[orientation].map((className, index) => {
    return {
      [`.${className}`]: {
        [`&::-webkit-scrollbar:${orientation}`]: getBackgroundStyles({
          orientation,
          color: ScrollParams.Color.SCROLLBAR,
          index,
        }),

        [`&::-webkit-scrollbar-thumb:${orientation}`]: getBackgroundStyles({
          orientation,
          color: ScrollParams.Color.THUMB,
          index,
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
};

// -moz
const getScrollStylesFoFF = () => {
  return scrollClassNamesFoFF.map((className, index) => {
    const opacity = ScrollParams.OPACITY_IN_REST + scrollOpacityStep * index;
    const trackColor = `rgba(${ScrollParams.Color.SCROLLBAR.replace(`rgb(`, ``).replace(`)`, ``)}, ${opacity})`;
    const thumbColor = `rgba(${ScrollParams.Color.THUMB.replace(`rgb(`, ``).replace(`)`, ``)}, ${opacity})`;
    const scrollWidth: `thin` | `auto` = navigator.userAgent.includes(`Windows`) ? `thin` : `auto`;

    return {
      [`.${className}`]: {
        scrollbarColor: `${thumbColor} ${trackColor}`,
        scrollbarWidth: scrollWidth,
      },
    };
  }).reduce((accum, styles) => {
    const style = Object.entries(styles);

    return {
      ...accum,
      ...Object.fromEntries(style),
    };
  }, {});
};

const scrollStyles = {
  ...getScrollStyles(ScrollOrientation.VERTICAL),
  ...getScrollStyles(ScrollOrientation.HORIZONTAL),
  ...getScrollStylesFoFF(),
};

const globalStyles = (theme: Theme) => ({
  "*::-webkit-scrollbar": {
    width: ScrollParams.Size.ACTIVE,
    height: ScrollParams.Size.ACTIVE,
  },

  "*": scrollStyles[`.${scrollClassNamesFoFF[0]}`],
  ...scrollStyles[`.${scrollClassNames[ScrollOrientation.VERTICAL][0]}`],
  ...scrollStyles[`.${scrollClassNames[ScrollOrientation.HORIZONTAL][0]}`],
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
