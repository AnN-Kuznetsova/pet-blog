import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { PostType } from "../types";


export const apiSlice = createApi({
  reducerPath: `api`,
  baseQuery: fetchBaseQuery({
    // baseUrl: `https://jsonplaceholder.typicode.com/`,
    baseUrl: `http://localhost`,
  }),
  tagTypes: [`Post`],
  endpoints: (builder) => ({
    getPosts: builder.query<PostType, void>({
      query: () => `/posts`,
      providesTags: [`Post`],
    }),
  }),
});


export const {
  useGetPostsQuery,
} = apiSlice;
