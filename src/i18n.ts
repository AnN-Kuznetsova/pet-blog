import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { translation as translationEn } from "./translation/en";
import { translation as translationRu } from "./translation/ru";


export enum Languages {
  RU = `ru`,
  EN = `en`,
}


i18n
  .use(initReactI18next)
  .init({
    debug: true,
    // lng: Languages.RU,
    fallbackLng: Languages.EN,
    resources: {
      [Languages.EN]: {
        translation: translationEn,
      },

      [Languages.RU]: {
        translation: translationRu,
      },
    },
  });
