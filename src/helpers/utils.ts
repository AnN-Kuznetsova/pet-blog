import add from "date-fns/add";
import format from "date-fns/format";
import enUS from "date-fns/locale/en-US";
import ru from "date-fns/locale/ru";

import { DateMeasureType, PostDateMode } from "../types/additional-types";
import { Languages } from "../i18n";
import { Locale } from "date-fns";


enum DateFormatMode {
  SHORT = `MMM yyyy`,
  LONG = `do MMMM yyyy, k:mm`,
}

const LanguageToLocale: Record<Languages, Locale> = {
  [Languages.EN]: enUS,
  [Languages.RU]: ru,
};

const formatDate = (dateString: string, language: Languages, mode: DateFormatMode = DateFormatMode.SHORT): string => {
  const date = new Date(dateString);

  return format(date, mode, {
    locale: LanguageToLocale[language],
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
