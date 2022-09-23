import React from "react";
import { Link } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  List,
  ListItem,
  Typography,
} from "@mui/material";

import { AppRoute } from "../../constants";
import { createStringAvatar } from "../../helpers/create-string-avatar";
import { formatDate } from "../../helpers/utils";
import { styles } from "./styles";
import { useGetPostsQuery, useGetUsersQuery } from "../../api/apiSlice";
import type { PostType } from "../../types";


export const PostsList: React.FC = (): JSX.Element => {
  const {
    data: posts = [],
    // isLoading,
    // isSuccess,
    // isError,
    // error,
  } = useGetPostsQuery();

  const {
    data: users = [],
    // isLoading,
    // isSuccess,
    // isError,
    // error,
  } = useGetUsersQuery();

  const handleItemButtonClick = (post: PostType) => {
    console.log(post);
  };

  return (
    <Box sx={styles.containerStyles}>
      <List sx={styles.postsListStyles}>
        {posts.map((post) => {
          const user = users.find((user) => user.id === post.userId);
          const date = formatDate(post.date);
          const postPageUrl = AppRoute.POST_PAGE.replace(`:id`, `${post.id}`);

          const stringAvatar:
            ReturnType<typeof createStringAvatar> |
            ReturnType<typeof createStringAvatar> & {sx: ReturnType<typeof styles.avatarStyles>} |
            null = user && !user.avatar ? createStringAvatar(user.name) : null;

          if (stringAvatar && stringAvatar.sx) {
            Object.entries(styles.avatarStyles()).forEach(([key, value]) => {
              stringAvatar.sx[key] = value;
            });
          }

          return user ? (
            <ListItem
              key={post.id}

            >
              <Link
                to={postPageUrl}
                style={styles.link}
              >
                <Button
                  sx={styles.itemButton}
                  onClick={handleItemButtonClick.bind(null, post)}
                >
                  {user.avatar &&
                    <Avatar
                      src={`${user.avatar}`}
                      alt=""
                      sx={styles.avatarStyles}
                    /> ||
                    <Avatar
                      {...stringAvatar}
                    />
                  }

                  <Box sx={styles.info}>
                    <Typography>{post.title}</Typography>
                    <Typography fontSize="0.8rem">{date}</Typography>
                  </Box>
                </Button>
              </Link>
            </ListItem>
          ) : null;
        }
        )}
      </List>
    </Box>
  );
};
