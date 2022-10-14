const Color = {
  WHITE: "rgba(255, 255, 255, 1)",
};

enum ColorType {
  BG = `BG`,
  HOVER_BG = `HOVER_BG`,
  DISABLED_BG = `DISABLED_BG`,
}

const BORDER_RADIUS = `4px`;

enum AppRoute {
  MAIN = `/`,
  POST_PAGE = `/post/:id`,
}


export {
  AppRoute,
  BORDER_RADIUS,
  Color,
  ColorType,
};
