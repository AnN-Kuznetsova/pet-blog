import { useTranslation } from "react-i18next";
import { Languages } from "../i18n";

import {
  DateMeasureType,
  ModalButtonControlsType,
  PostDateMode,
  SnackbarType,
} from "../types/additional-types";


export const useModalButtonControlsLabel = (): Record<ModalButtonControlsType, string> => {
  const {t} = useTranslation();

  return {
    [ModalButtonControlsType.CHANGE]: t(`button.change`),
    [ModalButtonControlsType.SAVE]: t(`button.save`),
    [ModalButtonControlsType.SEND]: t(`button.send`),
    [ModalButtonControlsType.CANCEL]: t(`button.cancel`),
  };
};


export const useDateMeasureTitle = (): Record<DateMeasureType, string> => {
  const {t} = useTranslation();
  const titles: {[key: string]: string} = {};

  Object.values(DateMeasureType).forEach((measure) => titles[measure] = t(`dateMeasure.${measure}`));

  return titles as Record<DateMeasureType, string>;
};


export const usePostDateLabel = (): Record<PostDateMode, string> => {
  const {t} = useTranslation();

  return {
    [PostDateMode.TODAY]: t(`post.form.date.today`),
    [PostDateMode.IN_FUTURE]: t(`post.form.date.other`),
  };
};


export const useSnackbarMessage = (): Record<SnackbarType, string> => {
  const {t} = useTranslation();

  return {
    [SnackbarType.SUCCESS]: t(`snackbar.success`),
    [SnackbarType.ERROR]: t(`snackbar.error`),
  };
};


export const useLanguageLabel = (): Record<Languages, string> => {
  const {t} = useTranslation();

  return {
    [Languages.EN]: t(`languages.en`),
    [Languages.RU]: t(`languages.ru`),
  };
};
