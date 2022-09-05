import { darken, Theme } from "@mui/material";
import { Color } from "../../constants";


export const appStyles = () => ({
  padding: "30px 50px",
  height: "100vh",
  overflowY: "hidden",

  color: Color.WHITE,

  backgroundColor: (theme: Theme) => darken(theme.palette.primary.dark, 0.7),

  // & ::-webkit-scrollbar {
  //   width: 10px;
  //   background-color: $light-beige;
  // }

  // & ::-webkit-scrollbar-track {
  //   background-color: $light-beige;
  //   border-radius: 100px;
  // }

  // & ::-webkit-scrollbar-thumb {
  //   background-color: $darkred;
  //   border-radius: 100px;
  // }
});
