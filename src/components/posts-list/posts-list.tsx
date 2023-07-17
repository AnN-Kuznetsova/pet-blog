import React, { useState } from "react";
import { Box } from "@mui/material";
import {
  AutoSizer as _AutoSizer,
  AutoSizerProps,
  List as _List,
  ListProps,
} from "react-virtualized";
import { useDispatch, useSelector } from "react-redux";

import { POST_LIST_ROW_HEIGHT } from "../../helpers/constants";
import { CircularPogress } from "../circular-pogress/circular-pogress";
import { ErrorPage } from "../error-page/error-page";
import { PostsListItem } from "../posts-list-item/posts-list-item";
import { selectAllPosts, useGetPostsQueryState } from "../api/postsSlice";
import { styles } from "./styles";
import { getScrollPosition } from "../../store/application/selectors";
import { setScrollPosition } from "../../store/application/application";


const List = _List as unknown as React.FC<ListProps>;
const AutoSizer = _AutoSizer as unknown as React.FC<AutoSizerProps>;


export const PostsList: React.FC = (): JSX.Element => {
  const {
    isLoading: isPostsLoading,
    isSuccess: isPostsSuccess,
    isError: isPostsError,
    error: postsError,
  } = useGetPostsQueryState();

  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const scrollPosition = useSelector(getScrollPosition);
  const [scrollCurrentPosition, setScrollCurrentPosition] = useState(scrollPosition);

  const handleScroll = ({scrollTop}: {scrollTop: number}) => {
    setScrollCurrentPosition(scrollTop);
  };

  const setListScrollPosition = () => {
    dispatch(setScrollPosition(scrollCurrentPosition));
  };

  const rowRenderer = ({
    key,
    index,
    style,
  }: {
    key: string;
    index: number;
    style: object;
  }): JSX.Element => {
    const post = posts[index];

    return (
      <div
        key={key}
        style={style}
      >
        <PostsListItem
          post={post}
          setListScrollPosition={setListScrollPosition}
        />
      </div>
    );
  };

  return (
    <Box sx={styles.containerStyles}>
      {isPostsLoading && <CircularPogress/>}

      {isPostsSuccess &&
        <AutoSizer>
          {({height, width}) => (
            <List
              width={width}
              height={height - 1}
              rowCount={posts.length}
              rowHeight={POST_LIST_ROW_HEIGHT}
              rowRenderer={rowRenderer}
              scrollTop={scrollCurrentPosition}
              onScroll={handleScroll}
              on
            />
          )}
        </AutoSizer>
      }

      {isPostsError && <ErrorPage error={postsError} />}
    </Box>
  );
};
