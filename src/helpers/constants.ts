const BORDER_RADIUS = `4px`;
const SNACKBAR_AUTO_HIDE_DURATION = 5000; // ms
const POST_LIST_ROW_HEIGHT = 86;

enum AppRoute {
  MAIN = `/`,
  POST_PAGE = `/post/:id`,
}

enum ModalType {
  NO_MODAL = `NO_MODAL`,
  ADD_POST = `ADD_POST`,
  EDIT_POST = `EDIT_POST`,
}

const ModalTitle: Record<ModalType, string> = {
  [ModalType.NO_MODAL]: ``,
  [ModalType.ADD_POST]: `Add new post`,
  [ModalType.EDIT_POST]: `Edit post`,
};


export {
  BORDER_RADIUS,
  SNACKBAR_AUTO_HIDE_DURATION,
  POST_LIST_ROW_HEIGHT,
  AppRoute,
  ModalType,
  ModalTitle,
};
