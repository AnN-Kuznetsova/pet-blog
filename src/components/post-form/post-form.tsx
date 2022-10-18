import React from "react";
import { Box } from "@mui/material";

import { styles } from "./styles";
import { usePost } from "../../hooks/usePost";


export const PostForm: React.FC = () => {
  const post = usePost();

  return (
    <Box sx={styles.container}></Box>
  );
};
