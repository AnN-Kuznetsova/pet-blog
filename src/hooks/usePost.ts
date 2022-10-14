import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { selectPostById } from "../store/posts/postsSlice";
import type { RootStateType } from "..";


export const usePost = () => {
  const {id: postId} = useParams();
  const post = useSelector((state: RootStateType) => postId ? selectPostById(state, postId) : null);

  return post;
};
