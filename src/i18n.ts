import i18n from "i18next";
import { initReactI18next } from "react-i18next";


i18n
  .use(initReactI18next)
  .init({
    debug: true,
    lng: `ru`,
    fallbackLng: `en`,
    resources: {
      en: {
        translation: {
          button: {
            save: `Save`,
            post: {
              add: `Add post`,
            },
          },
        },
      },

      ru: {
        translation: {
          button: {
            save: `Сохранить`,
            post: {
              add: `Добавить новый пост`,
            },
          },
        },
      },
    },
  });
