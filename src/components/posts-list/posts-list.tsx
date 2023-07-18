import React, { useRef, useState } from "react";
import { Box } from "@mui/material";
import {
  AutoSizer as _AutoSizer,
  AutoSizerProps,
  CellMeasurer as _CellMeasurer,
  CellMeasurerProps,
  CellMeasurerCache,
  List as _List,
  ListProps,
  ListRowRenderer,
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
const CellMeasurer = _CellMeasurer as unknown as React.FC<CellMeasurerProps>;


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

  const cache = useRef(
    new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: POST_LIST_ROW_HEIGHT,
    })
  );

  const handleScroll = ({scrollTop}: {scrollTop: number}) => {
    setScrollCurrentPosition(scrollTop);
  };

  const setListScrollPosition = () => {
    dispatch(setScrollPosition(scrollCurrentPosition));
  };

  const rowRenderer: ListRowRenderer = ({
    key,
    index,
    parent,
    style,
  }): JSX.Element => {
    const post = posts[index];

    return (
      <CellMeasurer
        key={key}
        cache={cache.current}
        columnIndex={0}
        rowIndex={index}
        parent={parent}
      >
        {({ registerChild }) => (
          <div
            ref={(element): void => {
              if (element && registerChild) {
                registerChild(element);
              }
            }}
            style={style}
          >
            <PostsListItem
              post={post}
              setListScrollPosition={setListScrollPosition}
            />
          </div>
        )}
      </CellMeasurer>
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
              rowHeight={cache.current.rowHeight}
              rowRenderer={rowRenderer}
              deferredMeasurementCache={cache.current}
              scrollTop={scrollCurrentPosition}
              onScroll={handleScroll}
            />
          )}
        </AutoSizer>
      }

      {isPostsError && <ErrorPage error={postsError} />}
    </Box>
  );
};
