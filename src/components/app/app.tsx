import React, { useEffect } from "react";
import i18n from "i18next";
import { Route, Routes } from "react-router-dom";
import {
  Box,
  CssBaseline,
  GlobalStyles,
} from "@mui/material";
import { useSelector } from "react-redux";

import { AppRoute } from "../../helpers/constants";
import { ErrorBoundary } from "../error-boundary/error-boundary";
import { ErrorPage } from "../error-page/error-page";
import { Layout } from "../layout/layout";
import { PostsList } from "../posts-list/posts-list";
import { PostPage } from "../post-page/post-page";
import { getLanguage } from "../../store/application/selectors";
import { styles } from "./styles";


export const App: React.FC = (): JSX.Element => {
  const language = useSelector(getLanguage);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  return (
    <>
      <CssBaseline />
      <GlobalStyles styles={styles.globalStyles} />

      <Box
        className="app"
        sx={styles.appStyles}
      >
        <ErrorBoundary>
          <Routes>
            <Route path={AppRoute.MAIN} element={<Layout />}>
              <Route index element={<PostsList />} />
              <Route path={AppRoute.POST_PAGE} element={<PostPage />} />
            </Route>

            <Route path="*" element={<ErrorPage error={404} />} />
          </Routes>
        </ErrorBoundary>
      </Box>
    </>
  );
};
