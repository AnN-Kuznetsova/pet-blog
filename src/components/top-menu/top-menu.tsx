import React from "react";
import { Box, Button } from "@mui/material";

import { styles } from "./styles";


export const TopMenu: React.FC = (): JSX.Element => {
  const handleAddNewButtonClick = () => {/**/};

  return (
    <Box sx={styles.container}>
      <Button
        variant="contained"
        onClick={handleAddNewButtonClick}
      >
        Add new post
      </Button>
    </Box>
  );
};
