import React from "react";
import { useParams } from "react-router-dom";
import { useGetUserQuery } from "../../api/apiSlice";


export const Post: React.FC = (): JSX.Element => {
  const {id: postId} = useParams();
  const userId = 10;
  const {
    data: user,
    isSuccess,
    isError,
    error,
  } = useGetUserQuery(userId);

  return (
    <>
      {postId}
      {isSuccess && <>{user.name}</> || `User not loading :(`}
    </>
  );
};
