import React from "react";
import { Box, Typography } from "@mui/material";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { useSelector } from "react-redux";

import { AvatarSize, UserAvatar } from "../user-avatar/user-avatar";
import { CircularPogress } from "../circular-pogress/circular-pogress";
import { DateFormatMode, formatDate } from "../../helpers/utils";
import { ErrorPage } from "../error-page/error-page";
import { getLanguage } from "../../store/application/selectors";
import { styles } from "./styles";
import { useGetPostsQueryState } from "../api/postsSlice";
import { useGetUserQuery } from "../api/usersSlice";
import { usePost } from "../../hooks/usePost";
import { useTranslation } from "react-i18next";


export const PostPage: React.FC = (): JSX.Element | null => {
  const {t} = useTranslation();
  const language = useSelector(getLanguage);
  const {
    isLoading: isPostsLoading,
    isSuccess: isPostsSuccess,
    isError: isPostsError,
    error: postsError,
  } = useGetPostsQueryState();
  const post = usePost();
  const date = post ? formatDate(post.date, language, DateFormatMode.LONG) : ``;

  const {
    data: user,
    isSuccess: isLoadUserSuccess,
    isError: isLoadUserError,
  } = useGetUserQuery(post?.userId ?? skipToken);

  return (
    <Box>
      {isPostsLoading && <CircularPogress/>}

      {isPostsSuccess && post &&
        <>
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
        </>
      }

      {isPostsSuccess && !post &&
        <Typography variant="h5">{t(`error.post-not-found`)}</Typography>
      }

      {isPostsError && <ErrorPage error={postsError} />}
    </Box>
  );
};
