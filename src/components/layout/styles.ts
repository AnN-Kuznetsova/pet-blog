import React from "react";


const container = () => ({
  height: "100%",
  overflowY: "hidden",
});

const main = {
  height: "calc(100vh - 2 * 30px - 92.5px)",
  overflowY: "auto",
} as React.CSSProperties;


export const styles = {
  container,
  main,
};
