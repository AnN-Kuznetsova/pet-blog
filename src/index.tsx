import "./i18n";
import React from "react";
import ReactDOM from "react-dom/client";
import i18n from "i18next";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material";

import { THEME } from "./helpers/theme";
import { App } from "./components/app/app";
import { Languages } from "./i18n";
import { changeLanguage } from "./store/application/application";
import { createStore } from "./store/store";
import { extendedApiSlice as extendedPostsApiSlice} from "./components/api/postsSlice";


const language = Languages.RU;

const store = createStore();
store.dispatch(extendedPostsApiSlice.endpoints.getPosts.initiate());
store.dispatch(changeLanguage(language));
i18n.changeLanguage(store.getState().application.language);

const root = ReactDOM.createRoot(
  document.getElementById(`root`) as HTMLElement
);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <React.StrictMode>
        <ThemeProvider theme={THEME}>
          <App />
        </ThemeProvider>
      </React.StrictMode>
    </Provider>
  </BrowserRouter>
);


export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatchType = typeof store.dispatch;
