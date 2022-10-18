import { Theme } from "@mui/material";


const container = (theme: Theme) => ({
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: theme.palette.primary.light,
});


export const styles = {
  container,
};
