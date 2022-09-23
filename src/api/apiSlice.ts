import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { addPosts, postsAdapter } from "../store/posts/posts";
import type { PostType, UserType } from "../types";


export const apiSlice = createApi({
  reducerPath: `api`,
  baseQuery: fetchBaseQuery({
    // baseUrl: `https://jsonplaceholder.typicode.com/`,
    // 8080 - для поднятия nginx в системе
    // 3000 - для работы из Докера
    baseUrl: `http://localhost:3000`, // 8080`,
  }),
  tagTypes: [`Post`, `User`],
  endpoints: (builder) => ({
    // Posts
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

    // Users
    getUsers: builder.query<UserType[], void>({
      query: () => `/users`,
      providesTags: (result = [], error, arg) => [
        `User`,
        ...result.map(({ id }) => ({ type: `User` as const, id })),
      ],
    }),
    getUser: builder.query<UserType, number>({
      query: (userId) => `/users/${userId}`,
      providesTags: (result, error, arg) => [{ type: `User` as const, id: arg }],
    }),
    addNewUser: builder.mutation<null, Omit<UserType, `id`>>({
      query: (initialUser) => ({
        url: `/users`,
        method: `POST`,
        body: initialUser,
      }),
      invalidatesTags: [`User`],
    }),
    editUser: builder.mutation<null, UserType>({
      query: (user) => ({
        url: `users/${user.id}`,
        method: `PUT`,
        body: user,
      }),
      invalidatesTags: (result, error, arg) => [{ type: `User` as const, id: arg.id }],
    }),
  }),
});


export const {
  useGetPostsQuery,
  useGetPostQuery,
  useAddNewPostMutation,
  useEditPostMutation,
  useGetUsersQuery,
  useGetUserQuery,
  useAddNewUserMutation,
  useEditUserMutation,
} = apiSlice;
