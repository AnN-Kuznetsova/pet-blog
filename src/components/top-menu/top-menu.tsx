import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import { Link, useMatch } from "react-router-dom";
import { LoadingButton } from "@mui/lab";

import { styles } from "./styles";
import { AppRoute } from "../../constants";
import { useAddNewPostMutation, useEditPostMutation, useGetPostsQueryState } from "../../store/posts/postsSlice";


export const TopMenu: React.FC = (): JSX.Element => {
  const {isSuccess: isPostsSuccess} = useGetPostsQueryState();
  const [addNewPost, {isLoading: isAddPostLoading}] = useAddNewPostMutation();
  const [editPost, {isLoading: isEditPostLoading}] = useEditPostMutation();
  const [isPostError, setIsPostError] = useState(false);

  console.log(isPostsSuccess);


  const isMainPage = useMatch(AppRoute.MAIN);
  const isPostPage = useMatch(AppRoute.POST_PAGE);

  const hanleAddPostButtonClick = async () => {
    try {
      await addNewPost({
        userId: `1`,
        title: `111`,
        date: new Date().toString(),
        body: `2222222`,
      }).unwrap();
    } catch (error: unknown) {
      console.error(`Failed to save the post: `, error);
      setIsPostError(true);
    }
  };

  const hanleEditPostButtonClick = async () => {
    // if (post) {
    //   try {
    //     await editPost({
    //       id: post.id,
    //       userId: post.userId,
    //       title: `111`,
    //       date: new Date().toString(),
    //       body: `2222222`,
    //     }).unwrap();
    //   } catch (error) {
    //     console.error(`Failed to edit the post: `, error);
    //     setIsPostError(true);
    //   }
    // }
  };

  return (
    <Box sx={styles.container}>
      {isMainPage &&
        <LoadingButton
          type="button"
          variant="contained"
          loading={isAddPostLoading}
          onClick={hanleAddPostButtonClick}
          disabled={!isPostsSuccess}
        >
          Add post
        </LoadingButton>
      }

      {!isMainPage &&
        <Link to={AppRoute.MAIN}>
          <Button
            variant="contained"
            disabled={!isPostsSuccess}
          >
            Home
          </Button>
        </Link>
      }

      {isPostPage &&
        <LoadingButton
          type="button"
          variant="contained"
          loading={isEditPostLoading}
          onClick={hanleEditPostButtonClick}
          disabled={!isPostsSuccess}
        >
          Edit post
        </LoadingButton>
      }
    </Box>
  );
};
