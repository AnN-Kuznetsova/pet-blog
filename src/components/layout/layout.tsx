import React, { useEffect, useRef, useState } from "react";
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


const CARD_HEIGHT = 50; // px

const listStyles = {
  list: {
    columnCount: `2`,
    margin: 0,
    padding: 0,
  },
  card: (newHeight: number) => ({
    display: `grid`,
    gridTemplateRows: `${CARD_HEIGHT}px 1fr`,
    height: newHeight ? newHeight : `auto`,
    minHeight: CARD_HEIGHT,
    maxHeight: CARD_HEIGHT * 2,
    "break-inside": `avoid`,
    "overflow-y": `auto`,
    outline: `1px solid white`,
  }),
  cardContainer: {
    gridRow: `1 / -1`,
  },
  content: {
    display: `block`,
  },
};


const Card = ({
  content,
}: {
  content: string[];
}): JSX.Element => {
  const card: React.LegacyRef<HTMLLIElement> | undefined = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (card.current) {
      const currentHeight = card.current.offsetHeight || 0;

      if (
        CARD_HEIGHT < currentHeight &&
        currentHeight < CARD_HEIGHT * 2
      ) {
        setHeight(CARD_HEIGHT * 2);
      }
    }
  }, [card]);

  return (
    <li
      ref={card}
      style={listStyles.card(height)}
    >
      <div style={listStyles.cardContainer}>
        {content.map((contentItem, itemIndex) => (
          <span
            key={contentItem + itemIndex}
            style={listStyles.content}
          >
            {contentItem}
          </span>
        ))}
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
          <ul style={listStyles.list}>
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
