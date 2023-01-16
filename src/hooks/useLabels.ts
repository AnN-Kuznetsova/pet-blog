import { useTranslation } from "react-i18next";

import {
  DateMeasureType,
  ModalButtonControlsType,
  PostDateMode,
} from "../components/post-form/helpers";


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
