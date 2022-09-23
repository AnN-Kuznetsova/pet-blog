import { apiSlice } from "../../api/apiSlice";
import type { UserType } from "../../types";


export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
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
  useGetUsersQuery,
  useGetUserQuery,
  useAddNewUserMutation,
  useEditUserMutation,
} = extendedApiSlice;
