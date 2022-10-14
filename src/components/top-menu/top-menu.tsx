import React, { useState } from "react";
import { Box, Button } from "@mui/material";

import { styles } from "./styles";
import { Link } from "react-router-dom";
import { AppRoute } from "../../constants";
import { LoadingButton } from "@mui/lab";
import { useAddNewPostMutation, useEditPostMutation } from "../../store/posts/postsSlice";


export const TopMenu: React.FC = (): JSX.Element => {
  const [addNewPost, {isLoading: isAddPostLoading}] = useAddNewPostMutation();
  const [editPost, {isLoading: isEditPostLoading}] = useEditPostMutation();
  const [isPostError, setIsPostError] = useState(false);

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
      <Link to={AppRoute.MAIN}>
        <Button variant="contained">
          Home
        </Button>
      </Link>

      <LoadingButton
        type="button"
        variant="contained"
        loading={isAddPostLoading}
        onClick={hanleAddPostButtonClick}
      >
        Add post
      </LoadingButton>

      <LoadingButton
        type="button"
        variant="contained"
        loading={isEditPostLoading}
        onClick={hanleEditPostButtonClick}
      >
        Edit post
      </LoadingButton>
    </Box>
  );
};
