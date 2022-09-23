import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useParams } from "react-router-dom";

import { styles } from "./styles";
import { useAddNewPostMutation, useEditPostMutation } from "../../store/posts/postsSlice";
import { useGetUserQuery } from "../../store/users/usersSlice";


export const Post: React.FC = (): JSX.Element => {
  const {id: postId} = useParams();
  const userId = 1;

  const {
    data: user,
    isSuccess,
    isError,
    error,
  } = useGetUserQuery(userId);

  const [addNewPost, {isLoading: isAddPostLoading}] = useAddNewPostMutation();
  const [editPost, {isLoading: isEditPostLoading}] = useEditPostMutation();
  const [isPostError, setIsPostError] = useState(false);

  const hanleAddPostButtonClick = async () => {
    try {
      await addNewPost({
        userId,
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
    if (postId) {
      try {
        await editPost({
          id: +postId,
          userId,
          title: `111`,
          date: new Date().toString(),
          body: `2222222`,
        }).unwrap();
      } catch (error) {
        console.error(`Failed to edit the post: `, error);
        setIsPostError(true);
      }
    }
  };

  return (
    <Box>
      <Box>
        <LoadingButton
          type="button"
          variant="outlined"
          sx={styles.postButton}
          loading={isAddPostLoading}
          onClick={hanleAddPostButtonClick}
        >
          Add post
        </LoadingButton>

        <LoadingButton
          type="button"
          variant="outlined"
          sx={styles.postButton}
          loading={isAddPostLoading}
          onClick={hanleEditPostButtonClick}
        >
          Edit post
        </LoadingButton>
      </Box>

      <div>
        {postId}
        {isSuccess && <>{user.name}</> || `User not loading :(`}
      </div>
    </Box>
  );
};
