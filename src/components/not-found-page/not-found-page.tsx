import React from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";

import { styles } from "./styles";


export const NotFoundPage: React.FC = (): JSX.Element => {
  return (
    <Box sx={styles.container}>
      <Typography
        variant="h1"
        sx={styles.title}
      >
        404
      </Typography>
      <Typography sx={styles.text}>
        Page not found
      </Typography>
    </Box>
  );
};
