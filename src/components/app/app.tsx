import { Button, List, ListItem } from "@mui/material";
import React from "react";
import { useGetPostsQuery } from "../../api/apiSlice";

function App() {
  const {
    data: posts = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPostsQuery();

  const images = [
    "img1.jpg",
    "img2.jpg",
    "img3.jpg",
  ];

  const handleButtonClick = () => {/**/};

  return (
    <div className="App">
      <Button
        variant="contained"
        onClick={handleButtonClick}
      >
        Button
      </Button>

      <List>
        {images.map((img) => (
          <ListItem key={img}>
            <img src={`${img}`} width="50" height="50" />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default App;
