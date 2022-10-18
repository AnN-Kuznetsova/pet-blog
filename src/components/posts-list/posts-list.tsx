import React from "react";
import { useSelector } from "react-redux";
import {
  Box,
  List,
} from "@mui/material";

import { CircularPogress } from "../circular-pogress/circular-pogress";
import { PostsListItem } from "../posts-list-item/posts-list-item";
import { selectAllPosts, useGetPostsQueryState } from "../../store/posts/postsSlice";
import { styles } from "./styles";
import { ErrorPage } from "../error-page/error-page";


export const PostsList: React.FC = (): JSX.Element => {
  const {
    isLoading: isPostsLoading,
    isSuccess: isPostsSuccess,
    isError: isPostsError,
    error: postsError,
  } = useGetPostsQueryState();

  const posts = useSelector(selectAllPosts);

  return (
    <>
      <Box sx={styles.containerStyles}>
        {isPostsLoading && <CircularPogress/>}

        {isPostsSuccess &&
          <List sx={styles.postsListStyles}>
            {posts.map((post) => {
              return (
                <PostsListItem
                  key={post.id}
                  post={post}
                />
              );
            }
            )}
          </List>
        }

        {isPostsError && <ErrorPage error={postsError} />}
      </Box>
    </>
  );
};
