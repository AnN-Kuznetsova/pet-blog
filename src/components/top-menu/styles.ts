const container = () => ({
  display: `flex`,
  marginBottom: 5,

  "& >:not(:last-child)": {
    marginRight: 1,
  },

  "&  >*:has(button)": {
    width: `auto`,
  },
});

const rightMenu = () => ({
  marginLeft: `auto`,
});


export const styles = {
  container,
  rightMenu,
};
