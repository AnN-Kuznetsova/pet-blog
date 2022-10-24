const container = () => ({
  width: "60vw",
  paddingTop: 1,

  "& form": {
    display: "flex",
    flexWrap: "wrap",
  },
});

const wrapper = () => ({

});

const control = () => ({
  width: "100%",

  "&:not(:last-child)": {
    marginBottom: 4,
  },
});


export const styles = {
  container,
  wrapper,
  control,
};
