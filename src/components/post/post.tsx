import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { useParams } from "react-router-dom";

import { styles } from "./styles";
import { selectPostById, useAddNewPostMutation, useEditPostMutation } from "../../store/posts/postsSlice";
import { useGetUserQuery } from "../../store/users/usersSlice";
import { useSelector } from "react-redux";
import { RootStateType } from "../..";
import { UserAvatar } from "../user-avatar/user-avatar";


export const Post: React.FC = (): JSX.Element | null => {
  const {id: postId} = useParams();
  const post = useSelector((state: RootStateType) => postId ? selectPostById(state, postId) : null);
  const {
    data: user,
    isSuccess: isLoadUserSuccess,
    isError: isLoadUserError,
  } = useGetUserQuery(post?.userId ?? skipToken);

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
    if (post) {
      try {
        await editPost({
          id: post.id,
          userId: post.userId,
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

  return post ? (
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
        <Box sx={styles.userInfo}>
          <UserAvatar user={user} />

          {isLoadUserSuccess && <Typography>{user.name}</Typography>}
          {isLoadUserError && <Typography>User is not available ... </Typography>}
        </Box>

        <Typography variant="h4">{post.title}</Typography>
        <Typography>{post.body}</Typography>
      </div>
    </Box>
  ) : (
    <Typography>Sorry, post not found :(</Typography>
  );
};
