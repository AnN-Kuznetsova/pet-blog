import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const apiSlice = createApi({
  reducerPath: `api`,
  baseQuery: fetchBaseQuery({
    // baseUrl: `https://jsonplaceholder.typicode.com/`,
    // 8080 - для поднятия nginx в системе
    // 3000 - для работы из Докера
    baseUrl: `/`, // `http://localhost:3000` // 8080`,
  }),
  tagTypes: [`Post`, `User`],
  endpoints: () => ({}),
});
