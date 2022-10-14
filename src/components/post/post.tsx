import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { AvatarSize, UserAvatar } from "../user-avatar/user-avatar";
import { formatDate } from "../../helpers/utils";
import { selectPostById } from "../../store/posts/postsSlice";
import { styles } from "./styles";
import { useGetUserQuery } from "../../store/users/usersSlice";
import type { RootStateType } from "../..";


export const Post: React.FC = (): JSX.Element | null => {
  const {id: postId} = useParams();
  const post = useSelector((state: RootStateType) => postId ? selectPostById(state, postId) : null);
  const date = post ? formatDate(post.date) : ``;

  const {
    data: user,
    isSuccess: isLoadUserSuccess,
    isError: isLoadUserError,
  } = useGetUserQuery(post?.userId ?? skipToken);

  const [isPostError, setIsPostError] = useState(false);

  return post ? (
    <Box>
      <Box sx={styles.userInfo}>
        <UserAvatar
          user={user}
          size={AvatarSize.BIG}
        />

        {isLoadUserSuccess && <Typography>{user.name}</Typography>}
        {isLoadUserError && <Typography>User is not available ... </Typography>}
      </Box>

      <Box sx={styles.postInfo}>
        <Typography sx={styles.date}>{date}</Typography>
        <Typography
          variant="h4"
          sx={styles.title}
        >
          {post.title}
        </Typography>
        <Typography>{post.body}</Typography>
      </Box>
    </Box>
  ) : (
    <Typography>Sorry, post not found :(</Typography>
  );
};
