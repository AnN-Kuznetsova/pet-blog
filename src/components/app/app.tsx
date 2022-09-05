import React from "react";
import {
  Box,
  CircularProgress,
  CssBaseline,
} from "@mui/material";
import { PostsList } from "../posts-list/posts-list";
import { useGetPostsQuery } from "../../api/apiSlice";
import { appStyles } from "./styles";
import { TopMenu } from "../top-menu/top-menu";


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

      <Box
        className="app"
        sx={appStyles}
      >
        {isPostsLoading && <CircularProgress color="secondary" />}

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
