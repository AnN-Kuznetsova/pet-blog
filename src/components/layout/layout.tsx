import React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import { BasicModal } from "../basic-modal/basic-modal";
import { Snack } from "../snack/snack";
import { TopMenu } from "../top-menu/top-menu";
import { styles } from "./styles";


export const Layout: React.FC = (): JSX.Element => {
  return (
    <Box sx={styles.container}>
      <TopMenu />

      <Snack />

      <main style={styles.main}>
        <Outlet />
      </main>

      <BasicModal />
      {/* <Snack /> */}
    </Box>
  );
};
