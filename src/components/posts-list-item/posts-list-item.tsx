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
import { getLanguage } from "../../store/application/selectors";
import { styles } from "./styles";
import { useGetUserQuery } from "../api/usersSlice";
import { useSelector } from "react-redux";
import type { PostType } from "../../types/types";


export interface PropsType {
  post: PostType;
  setListScrollPosition: ()=>void;
}


export const PostsListItem: React.FC<PropsType> = (props): JSX.Element | null => {
  const {post, setListScrollPosition} = props;
  const language = useSelector(getLanguage);
  const date = formatDate(post.date, language);
  const postPageUrl = AppRoute.POST_PAGE.replace(`:id`, `${post.id}`);
  const {data: user} = useGetUserQuery(post.userId);

  const handleItemButtonClick = (post: PostType) => {
    setListScrollPosition();

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
