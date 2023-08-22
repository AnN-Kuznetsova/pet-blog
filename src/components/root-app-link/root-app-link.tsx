import React from "react";
import { Button, Link } from "@mui/material";
import { OtherHouses } from "@mui/icons-material";

import { styles } from "./styles";


export const RootAppLink: React.FC = (): JSX.Element => {
  return (
    <Link
      href="/"
      underline="none"
      variant="button"
      sx={styles.rootAppLink}
    >
      <Button
        type="button"
        variant="outlined"
        sx={styles.rootAppLinkButton}
      >
        <OtherHouses />
      </Button>
    </Link>
  );
};
