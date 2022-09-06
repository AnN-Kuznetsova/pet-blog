import React from "react";
import {
  Avatar,
  Box,
  Button,
  List,
  ListItem,
  Typography,
} from "@mui/material";

import { createStringAvatar } from "../../helpers/create-string-avatar";
import { styles } from "./styles";
import { useGetPostsQuery, useGetUsersQuery } from "../../api/apiSlice";
import { PostType } from "../../types";
import { formatDate } from "../../helpers/utils";


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
            </ListItem>
          ) : null;
        }
        )}
      </List>
    </Box>
  );
};
