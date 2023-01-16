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
            send: `Send`,
            cancel: `Cancel`,
            change: `Change`,
            home: `Home`,
          },
          dateMeasure: {
            hours: `Houres`,
            days: `Days`,
            weeks: `Weeks`,
            months: `Months`,
          },
          post: {
            button: {
              add: `Add post`,
              edit: `Edit post`,
            },
            title: {
              add: `New post`,
              edit: `Edit post`,
            },
            form: {
              title: `Header`,
              text: `Post Text`,
              date: {
                title: `Post Date`,
                today: `Today`,
                other: `In Future add...`,
                placeholder: `Input number of...`,
              },
            },
          },
        },
      },

      ru: {
        translation: {
          button: {
            save: `Сохранить`,
            send: `Отправить`,
            cancel: `Отменить`,
            change: `Изменить`,
            home: `На главную`,
          },
          dateMeasure: {
            hours: `Часов`,
            days: `Дней`,
            weeks: `Недель`,
            months: `Месяцев`,
          },
          post: {
            button: {
              add: `Добавить новый пост`,
              edit: `Редактировать пост`,
            },
            title: {
              add: `Новый пост`,
              edit: `Редактирование`,
            },
            form: {
              title: `Заголовок`,
              text: `Текст`,
              date: {
                title: `Дата поста`,
                today: `Сегодня`,
                other: `Через...`,
                placeholder: `Введите количество...`,
              },
            },
          },
        },
      },
    },
  });
