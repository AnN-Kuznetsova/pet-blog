import React from "react";
import { Box, Button } from "@mui/material";


export const TopMenu: React.FC = (): JSX.Element => {
  const handleButtonClick = () => {/**/};

  return (
    <Box>
      <Button
        variant="contained"
        onClick={handleButtonClick}
      >
        Button
      </Button>
    </Box>
  );
};
