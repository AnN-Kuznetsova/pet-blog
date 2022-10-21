import format from "date-fns/format";
import enUS from "date-fns/locale/en-US";
import ru from "date-fns/locale/ru";


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


export {
  DateFormatMode,
  formatDate,
};
