import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  Box,
  CircularProgress,
  CssBaseline,
  GlobalStyles,
} from "@mui/material";

import { PostsList } from "../posts-list/posts-list";
import { TopMenu } from "../top-menu/top-menu";
import { styles } from "./styles";
import { CircularPogress } from "../circular-pogress/circular-pogress";
import { Post } from "../post/post";
import { AppRoute } from "../../constants";
import { NotFoundPage } from "../not-found-page/not-found-page";
import { Layout } from "../layout/layout";
import { useGetPostsQuery } from "../../store/posts/postsSlice";


export const App: React.FC = (): JSX.Element => {
  const {
    data: posts = [],
    isLoading: isPostsLoading,
    isSuccess: isPostsSuccess,
    isError,
    error,
  } = useGetPostsQuery();

  return (
    <>
      <CssBaseline />
      <GlobalStyles styles={styles.globalStyles} />

      <Box
        className="app"
        sx={styles.appStyles}
      >
        {isPostsLoading && <CircularPogress />}

        {isPostsSuccess &&
          <Routes>
            <Route path={AppRoute.MAIN} element={<Layout />}>
              <Route index element={<PostsList />} />
              <Route path={AppRoute.POST_PAGE} element={<Post />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        }
      </Box>
    </>
  );
};
