import i18n from "i18next";
import { initReactI18next } from "react-i18next";


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
      en: {
        translation: {
          button: {
            save: `Save`,
            home: `Home`,
            post: {
              add: `Add post`,
              edit: `Edit post`,
            },
          },
        },
      },

      ru: {
        translation: {
          button: {
            save: `Сохранить`,
            home: `На главную`,
            post: {
              add: `Добавить новый пост`,
              edit: `Редактировать пост`,
            },
          },
        },
      },
    },
  });
