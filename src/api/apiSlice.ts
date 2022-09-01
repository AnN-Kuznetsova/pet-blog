import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
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
      providesTags: [`Post`],
    }),

    // Users
    getUsers: builder.query<UserType[], void>({
      query: () => `/users`,
      providesTags: [`User`],
    }),
  }),
});


export const {
  useGetPostsQuery,
  useGetUsersQuery,
} = apiSlice;
