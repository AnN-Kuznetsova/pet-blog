import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootStateType } from "../..";
import { PostType } from "../../types";


export interface PostsStateType {
  ids: string[],
  entities: {
    [key: string]: PostType,
  },
}


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
  addPosts,
} = actions;

export {
  reducer,
};
