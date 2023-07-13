import React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import { BasicModal } from "../basic-modal/basic-modal";
import { Snack } from "../snack/snack";
import { TopMenu } from "../top-menu/top-menu";
import { styles } from "./styles";

const listContent = [
  [
    `Sunt Aut Facere Repellat Provident Occaecati Excepturi Optio Reprehenderit`,
    `Qui Est Esse`,
    `Ea Molestias Quasi Exercitationem Repellat Qui Ipsa Sit Aut`,
    `Qui Est Esse`,
  ],
  [],
  [
    `Qui Est Esse`,
    `Qui Est Esse`,
  ],
  [
    `Qui Est Esse`,
    `Sunt Aut Facere Repellat Provident Occaecati Excepturi Optio Reprehenderit`,
    `Qui Est Esse`,
    `Ea Molestias Quasi Exercitationem Repellat Qui Ipsa Sit Aut`,
    `Qui Est Esse`,
    `Sunt Aut Facere Repellat Provident Occaecati Excepturi Optio Reprehenderit`,
    `Qui Est Esse`,
    `Ea Molestias Quasi Exercitationem Repellat Qui Ipsa Sit Aut`,
    `Qui Est Esse`,
  ],
  [
    `Sunt Aut Facere Repellat Provident Occaecati Excepturi Optio Reprehenderit`,
    `Qui Est Esse`,
    `Ea Molestias Quasi Exercitationem Repellat Qui Ipsa Sit Aut`,
    `Qui Est Esse`,
  ],
  [
    `Sunt Aut Facere Repellat Provident Occaecati Excepturi Optio Reprehenderit`,
    `Qui Est Esse`,
    `Ea Molestias Quasi Exercitationem Repellat Qui Ipsa Sit Aut`,
    `Qui Est Esse`,
  ],
  [],
  [
    `Sunt Aut Facere Repellat Provident Occaecati Excepturi Optio Reprehenderit`,
    `Qui Est Esse`,
  ],
  [],
  [
    `Qui Est Esse`,
  ],
  [
    `Qui Est Esse`,
  ],
  [
    `Qui Est Esse`,
    `Qui Est Esse`,
    `Qui Est Esse`,
    `Qui Est Esse`,
  ],
];


const Card = ({
  content,
}: {
  content: string[];
}): JSX.Element => {
  return (
    <li className="card">
      <div className="card-container">
        <div className="card-wrapper">
          {content.map((contentItem, itemIndex) => (
            <span
              key={contentItem + itemIndex}
              className="content"
            >
              {contentItem}
            </span>
          ))}
        </div>
      </div>
    </li>
  );
};


export const Layout: React.FC = (): JSX.Element => {
  return (
    <Box sx={styles.container}>
      <TopMenu />

      <main style={styles.main}>
        <div style={{marginBottom: 100}}>
          <ul className="list">
            {listContent.map((content, index) => (
              <Card
                key={index}
                content={content}
              />
            ))}
          </ul>
        </div>

        <Outlet />
      </main>

      <BasicModal />
      <Snack />
    </Box>
  );
};
