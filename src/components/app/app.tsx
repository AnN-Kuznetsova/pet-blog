import React from "react";
import { Button } from "@mui/material";
import { useGetPostsQuery } from "../../api/apiSlice";
import { PostsList } from "../posts-list/posts-list";


export const App: React.FC = (): JSX.Element => {
  const {
    data: posts = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPostsQuery();

  const handleButtonClick = () => {/**/};

  return (
    <div className="App">
      <Button
        variant="contained"
        onClick={handleButtonClick}
      >
        Button
      </Button>

      {isSuccess && <PostsList /> }
    </div>
  );
};
