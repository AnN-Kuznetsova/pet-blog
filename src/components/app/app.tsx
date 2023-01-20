import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import {
  Box,
  CssBaseline,
  GlobalStyles,
} from "@mui/material";

import { AppRoute } from "../../helpers/constants";
import { ErrorBoundary } from "../error-boundary/error-boundary";
import { ErrorPage } from "../error-page/error-page";
import { Layout } from "../layout/layout";
import { PostsList } from "../posts-list/posts-list";
import { PostPage } from "../post-page/post-page";
import { styles } from "./styles";


export const App: React.FC = (): JSX.Element => {
  return (
    <>
      <CssBaseline />
      <GlobalStyles styles={styles.globalStyles} />

      <Box
        className="app"
        sx={styles.appStyles}
      >
        <ErrorBoundary>
          <Suspense fallback={<div>Загрузка...</div>}>
            <Routes>
              <Route path={AppRoute.MAIN} element={<Layout />}>
                <Route index element={<PostsList />} />
                <Route path={AppRoute.POST_PAGE} element={<PostPage />} />
              </Route>

              <Route path="*" element={<ErrorPage error={404} />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </Box>
    </>
  );
};
