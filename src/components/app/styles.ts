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
  VERTICAL = `vertical`,
  HORIZONTAL = `horizontal`,
}

const ScrollDataAtribute = {
  [ScrollOrientation.VERTICAL]: {
    IS_SCROLL_HOVER: `data-is-vertical-scroll-hover`,
    CLASS_INDEX: `data-vertical-class-index`,
    ANIMATION_INTERVAL: `data-vertical-animation-interval`,
  },
  [ScrollOrientation.HORIZONTAL]: {
    IS_SCROLL_HOVER: `data-is-horizontal-scroll-hover`,
    CLASS_INDEX: `data-horizontal-class-index`,
    ANIMATION_INTERVAL: `data-horizontal-animation-interval`,
  },
};

const SCROLLBAR_CLASS = `scrollbar`;
// {
//   VERTICAL: `scrollbar--vertical`,
//   HORIZONTAL: `scrollbar--horizontal`,
// };

const scrollAnimationFramesCount = Math.ceil(ScrollAnimationParams.FPS * ScrollAnimationParams.DURATION / 1000);
const animationTimeInterval = ScrollAnimationParams.DURATION / scrollAnimationFramesCount;
const scrollSizeStep = (ScrollParams.Size.HOVER - ScrollParams.Size.VISIBLE) / (scrollAnimationFramesCount - 1);
const scrollOpacityStep = (1 - ScrollParams.OPACITY_IN_REST) / (scrollAnimationFramesCount - 1);

const getScrollClassNames = (orientation: ScrollOrientation) => {
  return Array(scrollAnimationFramesCount).fill(null).map((step, index) => {
    return `${SCROLLBAR_CLASS}-${orientation}--${index}`;
  });
};

const scrollClassNames = {
  [ScrollOrientation.VERTICAL]: getScrollClassNames(ScrollOrientation.VERTICAL),
  [ScrollOrientation.HORIZONTAL]: getScrollClassNames(ScrollOrientation.HORIZONTAL),
};

let currentScrollElement: HTMLElement | null = null;

const getDataAtributeName = (dataAtribute: string) => (
  dataAtribute.replace(`data-`, ``)
    .split(`-`)
    .map((item, index) => {
      if (index === 0) {
        return item;
      }
      return `${item.charAt(0).toUpperCase()}${item.slice(1)}`;
    })
    .join(``)
);

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

const controlAnimation = (element: HTMLElement, orientation: ScrollOrientation, isScrollHover: boolean) => {
  element.setAttribute(ScrollDataAtribute[orientation].IS_SCROLL_HOVER, `${isScrollHover}`);
  animateScroll(element, orientation);
};

const controlScroll = (element: HTMLElement, orientation: ScrollOrientation, isScrollHover: boolean) => {
  const isAtributeScrollHover = element.dataset[getDataAtributeName(ScrollDataAtribute[orientation].IS_SCROLL_HOVER)];

  if (isScrollHover && isAtributeScrollHover !== `true`) {
    controlAnimation(element, orientation, true);
  }
  if (!isScrollHover && isAtributeScrollHover === `true`) {
    controlAnimation(element, orientation, false);
  }
};

document.body.addEventListener(`mousemove`, (event) => {
  const element = event.target as HTMLElement;

  if (element !== currentScrollElement) {
    if (currentScrollElement) {
      controlAnimation(currentScrollElement, ScrollOrientation.VERTICAL, false);
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

    controlScroll(currentScrollElement, ScrollOrientation.VERTICAL, isVerticalScroll);
  }
});

const animateScroll = (scrollElement: HTMLElement, orientation: ScrollOrientation) => {
  const currentAnimationInterval = scrollElement.dataset[getDataAtributeName(ScrollDataAtribute[orientation].ANIMATION_INTERVAL)];

  if (currentAnimationInterval) {
    clearInterval(currentAnimationInterval);
  }

  const intervalID = setInterval(() => {
    const isScrollHover = scrollElement.dataset[getDataAtributeName(ScrollDataAtribute[orientation].IS_SCROLL_HOVER)];
    const curentClassIndex = scrollElement.dataset[getDataAtributeName(ScrollDataAtribute[orientation].CLASS_INDEX)];
    const index = curentClassIndex && typeof +curentClassIndex === `number` ? +curentClassIndex : 0;
    let nextIndex: number | null = null;

    if (isScrollHover === `true` && index < scrollClassNames[orientation].length - 1) {
      nextIndex = index + 1;
    } else if (isScrollHover === `false` && index > 0) {
      nextIndex = index - 1;
    }

    if (nextIndex !== null) {
      scrollElement.classList.remove(scrollClassNames[orientation][index]);
      scrollElement.classList.add(scrollClassNames[orientation][nextIndex]);
      scrollElement.setAttribute(ScrollDataAtribute[orientation].CLASS_INDEX, `${nextIndex}`);
    } else {
      clearInterval(intervalID);
    }
  }, animationTimeInterval);

  scrollElement.setAttribute(ScrollDataAtribute[orientation].ANIMATION_INTERVAL, `${intervalID}`);
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

const scrollVerticalStyles = getScrollStyles(ScrollOrientation.VERTICAL);
const scrollHorizontalStyles = getScrollStyles(ScrollOrientation.HORIZONTAL);

const globalStyles = (theme: Theme) => ({
  "*::-webkit-scrollbar": {
    width: ScrollParams.Size.ACTIVE,
    height: ScrollParams.Size.ACTIVE,
  },

  ...scrollVerticalStyles[`.${SCROLLBAR_CLASS}-${ScrollOrientation.VERTICAL}--0`],
  ...scrollHorizontalStyles[`.${SCROLLBAR_CLASS}-${ScrollOrientation.HORIZONTAL}--0`],

  ...scrollVerticalStyles,
  ...scrollHorizontalStyles,

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
