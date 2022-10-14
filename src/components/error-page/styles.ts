const container = () => ({
  width: "100%",
  height: "100%",

  "&:first-child": {
    marginTop: "6rem",
  },
});

const title = () => ({
  width: "100%",
  textAlign: "center",
});

const text = () => ({
  width: "100%",
  fontSize: "2rem",
  textAlign: "center",
  whiteSpace: "pre-line",
});


export const styles = {
  container,
  title,
  text,
};
