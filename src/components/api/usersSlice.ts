import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import type { EntityState } from "@reduxjs/toolkit";

import { apiSlice } from "./apiSlice";
import type { UserType } from "../../types";
import type { RootStateType } from "../..";


const usersAdapter = createEntityAdapter<UserType>();
const initialState = usersAdapter.getInitialState();


export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    getUsers: builder.query<EntityState<UserType>, void>({
      query: () => `/users`,
      transformResponse: (responseData: UserType[]) => {
        return usersAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) => {
        if (!result) {
          return [ `User` ];
        }

        return [
          `User`,
          ...result.ids.map((id) => ({ type: `User` as const, id })),
        ];
      },
    }),

    getUser: builder.query<UserType, string>({
      query: (userId) => `/users/${userId}`,
      // transformResponse: (responseData: UserType) => {
      //   return usersAdapter.upsertOne(initialState, responseData);
      // },
      providesTags: (result, error, arg) => {
        if (!result) {
          return [];
        }

        return [{ type: `User` as const, id: arg }];
      },
    }),

    addNewUser: builder.mutation<UserType, Omit<UserType, `id`>>({
      query: (initialUser) => ({
        url: `/users`,
        method: `POST`,
        body: initialUser,
      }),
      // transformResponse: (responseData, meta, arg) => {
      //   return usersAdapter.addOne(initialState, {...arg, id: `65`});
      // },
      invalidatesTags: (result, error, arg) => {
        if (error) {
          return [];
        }

        return [`User`];
      },
    }),

    editUser: builder.mutation<UserType, UserType>({
      query: (user) => ({
        url: `users/${user.id}`,
        method: `PUT`,
        body: user,
      }),
      // transformResponse: (responseData, meta, arg) => {
      //   const { id, ...changes } = arg;
      //   return usersAdapter.updateOne(initialState, { id, changes });
      // },
      invalidatesTags: (result, error, arg) => {
        if (error) {
          return [];
        }

        return [{ type: `User` as const, id: arg.id }];
      },
    }),
  }),
});


export const {
  useGetUsersQuery,
  useGetUserQuery,
  useAddNewUserMutation,
  useEditUserMutation,
} = extendedApiSlice;


export const selectUsersResult = extendedApiSlice.endpoints.getUsers.select();
// export const useGetUsersQueryState = () => extendedApiSlice.endpoints.getUsers.useQueryState();

// export const selectAllUsers = createSelector(
//   selectUsersResult,
//   (usersResult) => usersResult.data ?? emptyUsers,
// );

// export const selectUserById = createSelector(
//   selectAllUsers,
//   (state: RootStateType, userId: number) => userId,
//   (users, userId) => users.entities[userId],
// );

const selectUsersData = createSelector(
  selectUsersResult,
  (usersResult) => usersResult.data,
);

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
} = usersAdapter.getSelectors((state: RootStateType) => selectUsersData(state) ?? initialState);
