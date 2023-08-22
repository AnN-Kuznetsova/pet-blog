import i18n from "i18next";
import Backend from "i18next-http-backend";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next";

// import { translation as translationEn } from "./translation/en";
// import { translation as translationRu } from "./translation/ru";


export enum Languages {
  RU = `ru`,
  EN = `en`,
}


export default i18n
  .use(Backend)
  .use(resourcesToBackend((language: any, namespace: any) => import(`./locales/${language}/${namespace}.json`)))
  .use(initReactI18next)
  .init({
    // debug: true,
    // lng: Languages.RU,
    fallbackLng: Languages.EN,
    detection: {
      order: [`queryString`, `cookie`],
      cache: [`cookie`],
    },
    interpolation: {
      escapeValue: false,
    },
    /* resources: {
      [Languages.EN]: {
        translation: translationEn,
      },

      [Languages.RU]: {
        translation: translationRu,
      },
    }, */
  });
