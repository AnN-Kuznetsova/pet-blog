const BORDER_RADIUS = `4px`;
const SNACKBAR_AUTO_HIDE_DURATION = 5000; // ms
const POST_LIST_ROW_HEIGHT = 86;
const POST_TEXT_ROWS_COUNT = 5;

enum AppRoute {
  MAIN = `/`,
  POST_PAGE = `/post/:id`,
}

enum ModalType {
  NO_MODAL,
  ADD_POST,
  EDIT_POST,
}


export {
  BORDER_RADIUS,
  SNACKBAR_AUTO_HIDE_DURATION,
  POST_LIST_ROW_HEIGHT,
  POST_TEXT_ROWS_COUNT,
  AppRoute,
  ModalType,
};
