import format from "date-fns/format";
import enUS from "date-fns/locale/en-US";
import ru from "date-fns/locale/ru";

const formatDate = (date: string) => {
  return format(new Date(date), `do MMM yyyy`, {
    locale: enUS,
  });
};


export {
  formatDate,
};
