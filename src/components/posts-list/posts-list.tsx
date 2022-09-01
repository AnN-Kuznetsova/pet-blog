import React from "react";
import {
  Avatar,
  Box,
  List,
  ListItem,
} from "@mui/material";

import { createStringAvatar } from "../../helpers/create-string-avatar";
import { useGetPostsQuery, useGetUsersQuery } from "../../api/apiSlice";


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

  return (
    <List>
      {posts.map((post) => {
        const user = users.find((user) => user.id === post.userId);

        return user ? (
          <ListItem key={post.id}>
            {user.avatar &&
              <Avatar
                src={`${user.avatar}`}
                alt=""
                sx={{ width: 56, height: 56 }}
              /> ||
              <Avatar {...createStringAvatar(user.name)} />
            }

            <Box>

            </Box>
          </ListItem>
        ) : null;
      }
      )}
    </List>
  );
};
