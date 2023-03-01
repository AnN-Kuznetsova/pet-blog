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
  DURATION: 1000, // ms
  FPS: 24,
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

const scrollAnimationFramesCount = Math.ceil(ScrollAnimationParams.FPS * ScrollAnimationParams.DURATION / 1000);
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
  [ScrollOrientation.VERTICAL]: boolean;
  [ScrollOrientation.HORIZONTAL]: boolean;
} => {
  const {right, bottom} = elementParams;
  const {pageX, pageY} = pageParams;

  const scrollHover = {
    [ScrollOrientation.VERTICAL]: false,
    [ScrollOrientation.HORIZONTAL]: false,
  };

  if (right && pageX < right && pageX > right - ScrollParams.Size.ACTIVE) {
    scrollHover[ScrollOrientation.VERTICAL] = true;
  }
  if (bottom && pageY < bottom && pageY > bottom - ScrollParams.Size.ACTIVE) {
    scrollHover[ScrollOrientation.HORIZONTAL] = true;
  }

  return scrollHover;
};

const controlScrollAnimation = (element: HTMLElement, orientation: ScrollOrientation, isScrollHover: boolean) => {
  const isElementAnimated = scrollAnimatedElements[orientation].has(element);
  const currentAnimation = isElementAnimated ? scrollAnimatedElements[orientation].get(element) : ScrollAnimationDirection.OUT;

  if (isScrollHover && currentAnimation === ScrollAnimationDirection.OUT) {
    scrollAnimatedElements[orientation].set(element, ScrollAnimationDirection.IN);

    if (!isElementAnimated) {
      animateScroll(element, orientation, 0);
    }
  }

  if (!isScrollHover && currentAnimation === ScrollAnimationDirection.IN) {
    scrollAnimatedElements[orientation].set(element, ScrollAnimationDirection.OUT);
  }
};

const animateScroll = (scrollElement: HTMLElement, orientation: ScrollOrientation, index: number) => {
  const currentAnimation = scrollAnimatedElements[orientation].get(scrollElement);
  let nextIndex = index;

  if (currentAnimation === ScrollAnimationDirection.IN && index < scrollClassNames[orientation].length - 1) {
    nextIndex = index + 1;
  } else if (currentAnimation === ScrollAnimationDirection.OUT && index > 0) {
    nextIndex = index - 1;
  }

  if (nextIndex !== index) {
    scrollElement.classList.remove(scrollClassNames[orientation][index]);
    scrollElement.classList.add(scrollClassNames[orientation][nextIndex]);
  }

  if (currentAnimation === ScrollAnimationDirection.IN ||
    (currentAnimation === ScrollAnimationDirection.OUT && nextIndex !== 0)) {
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

const scrollStyles = {
  ...getScrollStyles(ScrollOrientation.VERTICAL),
  ...getScrollStyles(ScrollOrientation.HORIZONTAL),
};


const globalStyles = (theme: Theme) => ({
  "*::-webkit-scrollbar": {
    width: ScrollParams.Size.ACTIVE,
    height: ScrollParams.Size.ACTIVE,
  },

  ...scrollStyles[`.${SCROLLBAR_CLASS}-${ScrollOrientation.VERTICAL}--0`],
  ...scrollStyles[`.${SCROLLBAR_CLASS}-${ScrollOrientation.HORIZONTAL}--0`],
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
