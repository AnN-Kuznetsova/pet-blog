import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  Box,
  CssBaseline,
  GlobalStyles,
} from "@mui/material";

import { PostsList } from "../posts-list/posts-list";
import { styles } from "./styles";
import { Post } from "../post/post";
import { AppRoute } from "../../constants";
import { NotFoundPage } from "../not-found-page/not-found-page";
import { Layout } from "../layout/layout";


export const App: React.FC = (): JSX.Element => {
  return (
    <>
      <CssBaseline />
      <GlobalStyles styles={styles.globalStyles} />

      <Box
        className="app"
        sx={styles.appStyles}
      >
        <Routes>
          <Route path={AppRoute.MAIN} element={<Layout />}>
            <Route index element={<PostsList />} />
            <Route path={AppRoute.POST_PAGE} element={<Post />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Box>
    </>
  );
};
