import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  Box,
  CssBaseline,
  GlobalStyles,
} from "@mui/material";

import { PostsList } from "../posts-list/posts-list";
import { styles } from "./styles";
import { PostPage } from "../post-page/post-page";
import { AppRoute } from "../../helpers/constants";
import { ErrorPage } from "../error-page/error-page";
import { Layout } from "../layout/layout";
import { ErrorBoundary } from "../error-boundary/error-boundary";


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
          <Routes>
            <Route path={AppRoute.MAIN} element={<Layout />}>
              <Route index element={<PostsList />} />
              <Route path={AppRoute.POST_PAGE} element={<PostPage />} />
            </Route>

            <Route path="*" element={<ErrorPage error={5005} />} />
          </Routes>
        </ErrorBoundary>
      </Box>
    </>
  );
};
