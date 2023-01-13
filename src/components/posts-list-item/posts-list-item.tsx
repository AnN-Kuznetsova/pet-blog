import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  ListItem,
  Typography,
} from "@mui/material";

import { AppRoute } from "../../helpers/constants";
import { UserAvatar } from "../user-avatar/user-avatar";
import { formatDate } from "../../helpers/utils";
import { useGetUserQuery } from "../api/usersSlice";
import { styles } from "./styles";
import type { PostType } from "../../types";


export interface PropsType {
  post: PostType;
}


export const PostsListItem: React.FC<PropsType> = (props): JSX.Element | null => {
  const {post} = props;
  const date = formatDate(post.date);
  const postPageUrl = AppRoute.POST_PAGE.replace(`:id`, `${post.id}`);
  const {data: user} = useGetUserQuery(post.userId);

  const handleItemButtonClick = (post: PostType) => {
    // console.log(post);
  };

  return (
    <ListItem key={post.id}>
      <Link to={postPageUrl}>
        <Button
          sx={styles.itemButton}
          onClick={handleItemButtonClick.bind(null, post)}
        >
          <UserAvatar
            user={user}
            styles={styles.avatar()}
          />

          <Box sx={styles.info}>
            <Typography>{post.title}</Typography>
            <Typography fontSize="0.8rem">{date}</Typography>
          </Box>
        </Button>
      </Link>
    </ListItem>
  );
};
