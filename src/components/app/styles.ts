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

const scrollClassNameFoFF = `${SCROLLBAR_CLASS}-FF`;

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

const controlScroll = ({isVerticalScroll, isHorizontalScroll}: {
  isVerticalScroll: boolean;
  isHorizontalScroll: boolean;
}) => {
  controlScrollClass(isVerticalScroll, scrollClassNames[ScrollOrientation.VERTICAL]);
  controlScrollClass(isHorizontalScroll, scrollClassNames[ScrollOrientation.HORIZONTAL]);
  controlScrollClass(isVerticalScroll || isHorizontalScroll, scrollClassNameFoFF);
};

document.body.addEventListener(`mousemove`, (event) => {
  const element = event.target as HTMLElement;

  if (element !== currentScrollElement) {
    if (currentScrollElement) {
      controlScroll({
        isVerticalScroll: false,
        isHorizontalScroll: false,
      });
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
    controlScroll({isVerticalScroll, isHorizontalScroll});
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

// -webkit
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

// -moz
const getScrollStylesFoFF = () => {
  const scrollWidth: `thin` | `auto` = navigator.userAgent.includes(`Windows`) ? `thin` : `auto`;

  const getStyles = (className: string, isHover: boolean) => {
    const classN = className ? `.${className}` : `*`;
    const opacity = isHover ? 1 : ScrollParams.OPACITY_IN_REST;
    const trackColor = `rgba(${ScrollParams.Color.SCROLLBAR.replace(`rgb(`, ``).replace(`)`, ``)}, ${opacity})`;
    const thumbColor = `rgba(${ScrollParams.Color.THUMB.replace(`rgb(`, ``).replace(`)`, ``)}, ${opacity})`;

    return {
      [`${classN}`]: {
        scrollbarColor: `${thumbColor} ${trackColor}`,
        scrollbarWidth: scrollWidth,
      },
    };
  };

  return {
    ...getStyles(``, false),
    ...getStyles(scrollClassNameFoFF, true),
  };
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

  ".input-type-number": {
    "--input-height": `16px`,
    "--input-padding": `10px`,
    "--button-width": `35px`,
    "--border-radius": `5px`,

    position: `relative` as const,
    width: 200,

    "input[type=number]": {
      display: `block`,
      width: `100%`,
      padding: `var(--input-padding) var(--button-width)`,
      lineHeight: `var(--input-height)`,
      fontSize: `var(--input-height)`,
      color: THEME.palette.primary.contrastText,
      textAlign: `center` as const,
      backgroundColor: THEME.palette.primary.light,
      boxShadow: `none`,
      border: `none`,
      borderRadius: `var(--border-radius)`,
      outline: `none`,
      MozAppearance: `textfield` as const,
      WebkitAppearance: `textfield` as const,
      appearance: `textfield` as const,

      "&::-webkit-outer-spin-button": {
        display: `none`,
      },

      "&::-webkit-inner-spin-button": {
        display: `none`,
      },
    },

    ".input-number-button": {
      position: `absolute` as const,
      top: 0,
      bottom: 0,
      width: `var(--button-width)`,
      height: `calc(var(--input-height) + var(--input-padding) * 2 + 2)`,
      margin: 0,
      padding: 0,
      fontSize: `20px`,
      fontWeight: 600,
      color: THEME.palette.primary.contrastText,
      textAlign: `center` as const,
      backgroundColor: THEME.palette.primary.main,
      border: `none`,
      cursor: `pointer`,

      "&:hover": {
        opacity: 0.6,
      },

      "&:active": {
        opacity: 0.3,
      },

      "&--decrement": {
        left: 0,
        borderRadius: `var(--border-radius) 0 0 var(--border-radius)`,
      },

      "&--increment": {
        right: 0,
        borderRadius: `0 var(--border-radius) var(--border-radius) 0`,
      },
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
