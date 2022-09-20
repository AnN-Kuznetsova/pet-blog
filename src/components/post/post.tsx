import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useParams } from "react-router-dom";

import { CircularPogress } from "../circular-pogress/circular-pogress";
import { styles } from "./styles";
import { useAddNewPostMutation, useGetUserQuery } from "../../api/apiSlice";


export const Post: React.FC = (): JSX.Element => {
  const {id: postId} = useParams();
  const userId = 10;
  const {
    data: user,
    isSuccess,
    isError,
    error,
  } = useGetUserQuery(userId);

  const [addNewPost, {isLoading: isAddPostLoading}] = useAddNewPostMutation();
  const [isAddPostError, setIsAddPostError] = useState(false);

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
      setIsAddPostError(true);
    }
  };

  return (
    <Box>
      <LoadingButton
        type="button"
        variant="outlined"
        sx={styles.addPostButton}
        loading={isAddPostLoading}
        onClick={hanleAddPostButtonClick}
      >
        Add post
      </LoadingButton>

      <div>
        {postId}
        {isSuccess && <>{user.name}</> || `User not loading :(`}
      </div>
    </Box>
  );
};
