import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootStateType } from "../..";
import { apiSlice } from "../../api/apiSlice";
import type { PostType } from "../../types";


export interface PostsStateType {
  ids: string[],
  entities: {
    [key: string]: PostType,
  },
}


export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<PostType[], void>({
      query: () => `/posts`,
      providesTags: (result = [], error, arg) => [
        `Post`,
        ...result.map(({ id }) => ({ type: `Post` as const, id })),
      ],
    }),
    getPost: builder.query<PostType, number>({
      query: (postId) => `/posts/${postId}`,
      providesTags: (result, error, arg) => [{ type: `Post` as const, id: arg }],
    }),
    addNewPost: builder.mutation<null, Omit<PostType, `id`>>({
      query: (initialPost) => ({
        url: `/posts/add`,
        method: `POST`,
        body: initialPost,
      }),
      invalidatesTags: [`Post`],
    }),
    editPost: builder.mutation<null, PostType>({
      query: (post) => ({
        url: `/posts/${post.id}`,
        method: `PUT`,
        body: post,
      }),
      invalidatesTags: (result, error, arg) => [{ type: `Post` as const, id: arg.id }],
    }),
  }),
});


export const postsAdapter = createEntityAdapter();
const initialState = postsAdapter.getInitialState() as PostsStateType;

export const postsSelectors = postsAdapter.getSelectors(
  (state: RootStateType) => state.posts
);


const postsSlice = createSlice({
  name: `posts`,
  initialState,
  reducers: {
    addPosts: (state, action: PayloadAction<PostType[]>) => {
      postsAdapter.setAll(state, action.payload);
    },
  },
});

const {actions, reducer} = postsSlice;


export const {
  useGetPostsQuery,
  useGetPostQuery,
  useAddNewPostMutation,
  useEditPostMutation,
} = extendedApiSlice;

export const {
  addPosts,
} = actions;

export {
  reducer,
};
