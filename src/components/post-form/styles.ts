const container = () => ({
  width: "60vw",
  paddingTop: 1,

  "& form": {
    display: "flex",
    flexWrap: "wrap",
  },
});

const control = () => ({
  width: "100%",

  "&:not(:last-child)": {
    marginBottom: 4,
  },
});

const postDate = () => ({
  marginBottom: 1.5,
});

const addDate = () => ({
  width: "200px",
});

const measure = () => ({
  width: "150px",
});


export const styles = {
  container,
  control,
  postDate,
  addDate,
  measure,
};
