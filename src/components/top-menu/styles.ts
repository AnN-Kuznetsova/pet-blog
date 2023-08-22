const container = () => ({
  display: `flex`,
  marginBottom: 3,

  "& >:not(:last-child)": {
    marginRight: 1,
  },

  "&  >*:has(button)": {
    width: `auto`,
  },
});

const rightMenu = () => ({
  display: `flex`,
  marginLeft: `auto`,

  "& >:not(:last-child)": {
    marginRight: 1,
  },
});


export const styles = {
  container,
  rightMenu,
};
