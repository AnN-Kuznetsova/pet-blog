import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import type { EntityState } from "@reduxjs/toolkit";

import { apiSlice } from "../../api/apiSlice";
import type { PostType } from "../../types";
import type { RootStateType } from "../..";


const postsAdapter = createEntityAdapter<PostType>();
const initialState = postsAdapter.getInitialState();


export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    getPosts: builder.query<EntityState<PostType>, void>({
      query: () => `/posts`,
      transformResponse: (responseData: PostType[]) => {
        return postsAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) => {
        if (!result) {
          return [ `Post` ];
        }

        return [
          `Post`,
          ...result.ids.map((id) => ({ type: `Post` as const, id })),
        ];
      },
    }),

    getPost: builder.query<PostType, string>({
      query: (postId) => `/posts/${postId}`,
      // transformResponse: (responseData: PostType) => {
      //   return postsAdapter.upsertOne(initialState, responseData);
      // },
      providesTags: (result, error, arg) => {
        if (!result) {
          return [];
        }

        return [{ type: `Post` as const, id: arg }];
      },
    }),

    addNewPost: builder.mutation<PostType, Omit<PostType, `id`>>({
      query: (initialPost) => ({
        url: `/posts/add`,
        method: `POST`,
        body: initialPost,
      }),
      // transformResponse: (responseData, meta, arg) => {
      //   return postsAdapter.addOne(initialState, {...arg, id: `55`});
      // },
      invalidatesTags: (result, error, arg) => {
        if (error) {
          return [];
        }

        return [`Post`];
      },
    }),

    editPost: builder.mutation<PostType, PostType>({
      query: (post) => ({
        url: `/posts/edit/${post.id}`,
        method: `PUT`,
        body: post,
      }),
      // transformResponse: (responseData, meta, arg) => {
      //   const { id, ...changes } = arg;
      //   return postsAdapter.updateOne(initialState, { id, changes });
      // },
      invalidatesTags: (result, error, arg) => {
        if (error) {
          return [];
        }

        return [{ type: `Post` as const, id: arg.id }];
      },
    }),
  }),
});


export const {
  useGetPostsQuery,
  useGetPostQuery,
  useAddNewPostMutation,
  useEditPostMutation,
} = extendedApiSlice;


export const selectPostsResult = extendedApiSlice.endpoints.getPosts.select();
export const useGetPostsQueryState = () => extendedApiSlice.endpoints.getPosts.useQueryState();

const selectPostsData = createSelector(
  selectPostsResult,
  (postsResult) => postsResult.data,
);

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
} = postsAdapter.getSelectors<RootStateType>((state) => selectPostsData(state) ?? initialState);
