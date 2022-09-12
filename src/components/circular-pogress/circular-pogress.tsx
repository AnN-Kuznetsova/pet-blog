import React from "react";
import { Box, CircularProgress } from "@mui/material";
import { styles } from "./styles";


export const CircularPogress: React.FC = (): JSX.Element => {
  return (
    <Box sx={styles.container}>
      <CircularProgress
        color="secondary"
        size="6rem"
      />
    </Box>
  );
};
