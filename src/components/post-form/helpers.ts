import add from "date-fns/add";
import { SnackbarType } from "../snack/snack";


const POST_TEXT_ROWS_COUNT = 5;

enum PostDateMode {
  TODAY = `TODAY`,
  IN_FUTURE = `IN_FUTURE`,
}

const PostDateLabel: Record<PostDateMode, string> = {
  [PostDateMode.TODAY]: `Today`,
  [PostDateMode.IN_FUTURE]: `In Future add`,
};

enum DateMeasureType {
  HOUR = `hours`,
  DAY = `days`,
  WEEK = `weeks`,
  MONTH = `months`,
}

const DateMeasureTitle: Record<DateMeasureType, string> = {
  [DateMeasureType.HOUR]: `Houres`,
  [DateMeasureType.DAY]: `Days`,
  [DateMeasureType.WEEK]: `Weeks`,
  [DateMeasureType.MONTH]: `Months`,
};

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
  POST_TEXT_ROWS_COUNT,
  PostDateMode,
  PostDateLabel,
  DateMeasureType,
  DateMeasureTitle,
  SnackbarMessage,
  calcPostDate,
};
