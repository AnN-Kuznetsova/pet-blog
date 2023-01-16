import add from "date-fns/add";
import format from "date-fns/format";
import enUS from "date-fns/locale/en-US";

import { DateMeasureType, PostDateMode } from "../types/additional-types";


enum DateFormatMode {
  SHORT = `MMM yyyy`,
  LONG = `do MMMM yyyy, k:mm`,
}

const formatDate = (dateString: string, mode: DateFormatMode = DateFormatMode.SHORT): string => {
  const date = new Date(dateString);

  return format(date, mode, {
    locale: enUS,
  });
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
  DateFormatMode,
  calcPostDate,
  formatDate,
};
