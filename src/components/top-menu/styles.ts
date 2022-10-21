const container = () => ({
  display: `flex`,
  marginBottom: 7,

  "& >:not(:last-child)": {
    marginRight: 1,
  },

  "&  >*:has(button)": {
    width: `auto`,
  },
});


export const styles = {
  container,
};
