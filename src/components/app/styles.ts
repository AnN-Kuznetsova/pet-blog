import { THEME } from "../../helpers/theme";
import type { Theme } from "@mui/material";


/* const CARD_HEIGHT = 50; // px

const rerender = () => {
  const list: HTMLElement | null = document.querySelector(`main`);
  const listItems: NodeListOf<HTMLElement> | [] = list?.querySelectorAll(`.list-item-container`) || [];

  console.log(list);

  listItems?.forEach((item: HTMLElement) => {
    const itemHeight = item.offsetWidth;

    if (
      CARD_HEIGHT < itemHeight &&
      itemHeight < CARD_HEIGHT * 2
    ) {
      item.style.height = `${CARD_HEIGHT * 2}px`;
    }
  });
};

document.addEventListener(`DOMContentLoaded`, rerender); */

// *************************************************

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

  // *************************

  /* ".list": {
    columnCount: `2`,
    // columnGap: `5px`,

    // display: `grid`,
    // gap: 10,
    // gridAutoFlow: `dense`,
    // gridTemplateColumns: `repeat(2, 1fr)`,
    // gridAutoRows: `minmax(50px, 1fr)`,
    // gridAutoRows: `50px`,

    margin: 0,
    padding: 0,
  },

  ".list-item-container": {
    display: `grid`,
    gridTemplateRows: `48px 1fr`,// `1fr 1fr`,
    // gridTemplateRows: 50,
    // gridTemplateRows: `repeat(auto-fit, 50px)`,
    // gridTemplateRows: `repeat(2, 1fr)`,// `repeat(2, 1fr)`,

    // gridTemplateRows: `repeat(2, 25px)`,

    // gridTemplateRows: `repeat(auto-fit, minmax(25px, 50px))`,//clamp(25px, 1fr, 50px))`,
    // gridTemplateRows: `clamp(25px, minmax(, 50px), 50px`,
    gridAutoRows: 50,
    alignItems: `stretch`,
    "break-inside": `avoid`,

    // gridRow: `span `,//`span 2`,

    // display: `block`,
    "overflow-y": `auto`,

    minHeight: 50,
    maxHeight: 100,
    // height: `max-content`,
    // height: 200,
    // height: `minmax(50px, 100px)`,
    // height: `max(100%, 100px)`, //`max("auto", 100px)`,
    // height: `clamp(50px, calc(100%), 100px)`,
    // height: `min()`,

    // border: `1px solid white`,
    outline: `1px solid white`,
  },

  ".list-item-wrapper": {
    // gridRow: `span 2`,
    gridRow: `1 / -1`,

    display: `grid`,

    // gridTemplateRows: `max(1fr, 50px)`,
    // height: `max(100%, 100px)`,
    // height: 100,

    // height: `max-content`,
  },

  ".list-item-inner-wrapper": {
    height: `max(auto, 100px)`,
  },

  ".list-item": {
    // height: `max(100%, 100px)`,
    height: `max-content`,
  },

  ".inner-content": {
    display: `block`,
    minHeight: 25,

    // gridRow: `1 / -1`,
    // gridColumn: `1`,
  }, */
});

const appStyles = () => ({
  padding: "30px 50px",
  height: "100vh",
  //overflowY: "hidden",
});


export const styles = {
  appStyles,
  globalStyles,
};
