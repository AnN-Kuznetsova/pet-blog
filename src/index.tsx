import { ThemeProvider } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { App } from "./components/app/app";
import { THEME } from "./helpers/theme";
import { extendedApiSlice as extendedPostsApiSlice} from "./store/posts/postsSlice";
import { createStore } from "./store/store";


const store = createStore();
store.dispatch(extendedPostsApiSlice.endpoints.getPosts.initiate());

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
