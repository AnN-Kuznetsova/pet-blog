import React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import { TopMenu } from "../top-menu/top-menu";
import { BasicModal } from "../modal/modal";
import { styles } from "./styles";


export const Layout: React.FC = (): JSX.Element => {
  return (
    <Box sx={styles.container}>
      <TopMenu />

      <main style={styles.main}>
        <Outlet />
      </main>

      <BasicModal />
    </Box>
  );
};
