const BORDER_RADIUS = `4px`;

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
  AppRoute,
  BORDER_RADIUS,
  ModalType,
  ModalTitle,
};
