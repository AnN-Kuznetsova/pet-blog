import { darken } from "@mui/material";
import { Theme } from "@mui/system";
import format from "date-fns/format";
import enUS from "date-fns/locale/en-US";
import ru from "date-fns/locale/ru";

import { ColorType } from "../constants";


const formatDate = (date: string) => {
  return format(new Date(date), `do MMM yyyy`, {
    locale: enUS,
  });
};

const getColor = (theme: Theme ,colorType: ColorType) => {
  switch (colorType) {
  case ColorType.BG:
    return `${darken(theme.palette.primary.light, 0.5)}`;

  case ColorType.HOVER_BG:
    return `${darken(theme.palette.primary.light, 0.3)}`;

  case ColorType.DISABLED_BG:
    return theme.palette.grey[600];

  default:
    return theme.palette.primary.main;
  }
};


export {
  formatDate,
  getColor,
};
