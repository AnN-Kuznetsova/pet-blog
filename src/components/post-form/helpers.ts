import add from "date-fns/add";

import { SnackbarType } from "../snack/snack";


enum ModalButtonControlsType {
  CHANGE,
  SAVE,
  SEND,
  CANCEL,
}

enum PostDateMode {
  TODAY = `TODAY`,
  IN_FUTURE = `IN_FUTURE`,
}

enum DateMeasureType {
  HOUR = `hours`,
  DAY = `days`,
  WEEK = `weeks`,
  MONTH = `months`,
}

const SnackbarMessage: Record<SnackbarType, string> = {
  [SnackbarType.SUCCESS]: `It\`s Successful Success!`,
  [SnackbarType.ERROR]: `It\`s Fiasco Bro :(`,
};

const calcPostDate = ({
  dateMode,
  duration,
  measure,
}: {
  dateMode: PostDateMode;
  duration: number;
  measure: DateMeasureType;
}): string => {
  let postDate = ``;
  const today = new Date();

  postDate = today.toString();

  if (dateMode === PostDateMode.IN_FUTURE) {
    if (Number.isInteger(duration) && duration > 0) {
      postDate = add(today, {[measure]: duration}).toString();
    }
  }

  return postDate;
};


export {
  DateMeasureType,
  ModalButtonControlsType,
  PostDateMode,
  SnackbarMessage,
  calcPostDate,
};
