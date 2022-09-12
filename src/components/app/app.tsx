import React from "react";
import {
  Box,
  CircularProgress,
  CssBaseline,
  GlobalStyles,
} from "@mui/material";

import { PostsList } from "../posts-list/posts-list";
import { TopMenu } from "../top-menu/top-menu";
import { styles } from "./styles";
import { useGetPostsQuery } from "../../api/apiSlice";
import { CircularPogress } from "../circular-pogress/circular-pogress";


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
          <>
            <TopMenu />
            <PostsList />
          </>
        }
      </Box>
    </>
  );
};
