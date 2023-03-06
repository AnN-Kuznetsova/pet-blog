import React from "react";
import { Box } from "@mui/material";
import {
  AutoSizer as _AutoSizer,
  AutoSizerProps,
  List as _List,
  ListProps,
} from "react-virtualized";
import { useSelector } from "react-redux";

import { POST_LIST_ROW_HEIGHT } from "../../helpers/constants";
import { CircularPogress } from "../circular-pogress/circular-pogress";
import { ErrorPage } from "../error-page/error-page";
import { PostsListItem } from "../posts-list-item/posts-list-item";
import { selectAllPosts, useGetPostsQueryState } from "../api/postsSlice";
import { styles } from "./styles";
import { PostType } from "../../types/types";

const responseDataRaw = [
  {
    userId: `1`,
    id: `1`,
    title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    date: "2022-09-02T10:12:00.921Z",
    body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
  },
  {
    userId: 1,
    id: 2,
    title: "qui est esse",
    date: "2022-09-02T10:12:00.921Z",
    body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
  },
  {
    userId: 1,
    id: 3,
    date: "2022-09-02T10:12:00.921Z",
    title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
    body: "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut",
  },
  {
    userId: 1,
    id: 4,
    date: "2022-09-02T10:12:00.921Z",
    title: "eum et est occaecati",
    body: "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit",
  },
  {
    userId: 1,
    id: 5,
    date: "2022-09-02T10:12:00.921Z",
    title: "nesciunt quas odio",
    body: "repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque",
  },
  {
    userId: 1,
    id: 6,
    title: "dolorem eum magni eos aperiam quia",
    date: "2022-09-02T10:12:00.921Z",
    body: "ut aspernatur corporis harum nihil quis provident sequi\nmollitia nobis aliquid molestiae\nperspiciatis et ea nemo ab reprehenderit accusantium quas\nvoluptate dolores velit et doloremque molestiae",
  },
  {
    userId: 1,
    id: 7,
    title: "magnam facilis autem",
    date: "2022-09-02T10:12:00.921Z",
    body: "dolore placeat quibusdam ea quo vitae\nmagni quis enim qui quis quo nemo aut saepe\nquidem repellat excepturi ut quia\nsunt ut sequi eos ea sed quas",
  },
  {
    userId: 1,
    id: 8,
    title: "dolorem dolore est ipsam",
    date: "2022-09-02T10:12:00.921Z",
    body: "dignissimos aperiam dolorem qui eum\nfacilis quibusdam animi sint suscipit qui sint possimus cum\nquaerat magni maiores excepturi\nipsam ut commodi dolor voluptatum modi aut vitae",
  },
  {
    userId: 1,
    id: 9,
    title: "nesciunt iure omnis dolorem tempora et accusantium",
    date: "2022-09-02T10:12:00.921Z",
    body: "consectetur animi nesciunt iure dolore\nenim quia ad\nveniam autem ut quam aut nobis\net est aut quod aut provident voluptas autem voluptas",
  },
  {
    userId: 1,
    id: 10,
    title: "optio molestias id quia eum",
    date: "2022-09-02T10:12:00.921Z",
    body: "quo et expedita modi cum officia vel magni\ndoloribus qui repudiandae\nvero nisi sit\nquos veniam quod sed accusamus veritatis error",
  },
] as PostType[];


const List = _List as unknown as React.FC<ListProps>;
const AutoSizer = _AutoSizer as unknown as React.FC<AutoSizerProps>;


export const PostsList: React.FC = (): JSX.Element => {
  // const {
  //   isLoading: isPostsLoading,
  //   isSuccess: isPostsSuccess,
  //   isError: isPostsError,
  //   error: postsError,
  // } = useGetPostsQueryState();

  const isPostsSuccess = true;
  // const posts = useSelector(selectAllPosts);
  const posts = responseDataRaw;

  // console.log(posts);

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
        <PostsListItem post={post} />
      </div>
    );
  };

  return (
    <>
      <Box sx={styles.containerStyles}>
        {/* {isPostsLoading && <CircularPogress/>} */}

        {isPostsSuccess &&
          <AutoSizer>
            {({height, width}) => (
              <List
                width={width}
                height={height - 1}
                rowCount={posts.length}
                rowHeight={POST_LIST_ROW_HEIGHT}
                rowRenderer={rowRenderer}
              />
            )}
          </AutoSizer>
        }

        {/* {isPostsError && <ErrorPage error={postsError} />} */}
      </Box>
      <Box sx={styles.containerStyles}>
        {/* {isPostsLoading && <CircularPogress/>} */}

        {isPostsSuccess &&
          <AutoSizer>
            {({height, width}) => (
              <List
                width={width}
                height={height - 1}
                rowCount={posts.length}
                rowHeight={POST_LIST_ROW_HEIGHT}
                rowRenderer={rowRenderer}
              />
            )}
          </AutoSizer>
        }

        {/* {isPostsError && <ErrorPage error={postsError} />} */}
      </Box>
    </>
  );
};
