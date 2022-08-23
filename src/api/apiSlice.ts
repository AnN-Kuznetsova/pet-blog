import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { PostType } from "../types";


export const apiSlice = createApi({
  reducerPath: `api`,
  baseQuery: fetchBaseQuery({
    // baseUrl: `https://jsonplaceholder.typicode.com/`,
    baseUrl: `http://localhost:8080`,
  }),
  tagTypes: [`Post`],
  endpoints: (builder) => ({
    getPosts: builder.query<PostType, void>({
      query: () => `/posts`,
      providesTags: [`Post`],
    }),
    // getImage: builder.query<_, string>({
    //   query: (imgUrl) => ({url: `images/${imgUrl}`}),
    //   // providesTags: () => [{}],
    // }),
  }),
});


export const {
  useGetPostsQuery,
} = apiSlice;
