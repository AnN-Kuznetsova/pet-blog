const icon = (isLoading: boolean) => ({
  marginRight: 1,
  height: `24px`,
  color: isLoading ? `transparent` : `auto`,
});

const list = () => ({
  padding: 0,
});

const listItem = () => ({
  padding: 0,
});


export const styles = {
  icon,
  list,
  listItem,
};
