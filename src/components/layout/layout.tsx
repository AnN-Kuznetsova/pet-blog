import React from "react";
import { Outlet } from "react-router-dom";

import { TopMenu } from "../top-menu/top-menu";


export const Layout: React.FC = (): JSX.Element => {
  return (
    <div>
      <TopMenu />

      <main>
        <Outlet />
      </main>
    </div>
  );
};
