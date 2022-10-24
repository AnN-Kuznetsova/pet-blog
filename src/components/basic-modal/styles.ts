import { Theme } from "@mui/material";


const container = () => ({
  position: "fixed",
  top: "50%",
  left: "50%",
  display: "flex",
  flexDirection: "column",
  maxWidth: "80vw",
  minHeight: 400,
  maxHeight: "80vh",
  padding: 4,
  transform: "translate(-50%, -50%)",
});

const containerInner = () => ({
  display: "flex",
  height: "100%",
  maxHeight: "calc(80vh - 64px - 65px - 68.5px)",
  marginBottom: "auto",
  overflow: "auto",
});

const title = () => ({
  marginBottom: 4,
  textTransform: "uppercase",
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
  containerInner,
  title,
  closeButton,
};
