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

// *************************************************

const SCROLLBAR_CLASS = `scrollbar`;

enum ScrollOrientation {
  VERTICAL = `vertical`,
  HORIZONTAL = `horizontal`,
}

const scrollClassNames = {
  [ScrollOrientation.VERTICAL]: `${SCROLLBAR_CLASS}-${ScrollOrientation.VERTICAL}`,
  [ScrollOrientation.HORIZONTAL]: `${SCROLLBAR_CLASS}-${ScrollOrientation.HORIZONTAL}`,
};

let currentScrollElement: HTMLElement | null = null;

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

  const scrollIsHover = {
    isVerticalScroll: false,
    isHorizontalScroll: false,
  };

  if (right && clientX < right && clientX > right - ScrollParams.Size.ACTIVE) {
    scrollIsHover.isVerticalScroll = true;
  }
  if (bottom && clientY < bottom && clientY > bottom - ScrollParams.Size.ACTIVE) {
    scrollIsHover.isHorizontalScroll = true;
  }

  return scrollIsHover;
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

document.body.addEventListener(`mousemove`, (event) => {
  const element = event.target as HTMLElement;

  if (element !== currentScrollElement) {
    if (currentScrollElement) {
      currentScrollElement.classList.remove(scrollClassNames[ScrollOrientation.VERTICAL], scrollClassNames[ScrollOrientation.HORIZONTAL]);
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

    const {isVerticalScroll, isHorizontalScroll} = getScrollbarParams(elementParams, pageParams);

    controlScrollClass(isVerticalScroll, scrollClassNames[ScrollOrientation.VERTICAL]);
    controlScrollClass(isHorizontalScroll, scrollClassNames[ScrollOrientation.HORIZONTAL]);
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
  const size = isHover ? ScrollParams.Size.HOVER : ScrollParams.Size.VISIBLE;
  const opacity = isHover ? 1 : ScrollParams.OPACITY_IN_REST;
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
  const getStyles = (className: string, isHover: boolean) => {
    const classN = className ? `.${className}` : `*`;

    return {
      [`${classN}::-webkit-scrollbar:${orientation}`]: getBackgroundStyles({
        orientation,
        color: ScrollParams.Color.SCROLLBAR,
        isHover,
      }),

      [`${classN}::-webkit-scrollbar-thumb:${orientation}`]: getBackgroundStyles({
        orientation,
        color: ScrollParams.Color.THUMB,
        isHover,
      }),
    };
  };

  return {
    ...getStyles(``, false),
    ...getStyles(scrollClassNames[orientation], true),
  };
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
