import { Theme } from "@mui/material";


const container = () => ({
  position: "fixed",
  top: "50%",
  left: "50%",
  padding: 4,
  transform: "translate(-50%, -50%)",
});

const title = () => ({
  marginBottom: 3,
});

const closeButton = (theme: Theme) => ({
  position: "absolute",
  right: 10,
  top: 10,
  transition: "all 0.3s",

  "&:hover": {
    color: theme.palette.error.main,
    transform: "rotate(90deg)",
  },
});


export const styles = {
  container,
  title,
  closeButton,
};
