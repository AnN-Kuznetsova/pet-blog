import { Color } from "../../constants";

const containerStyles = () => ({
  height: "calc(100% - 50px)",
  overflowY: `auto`,
});

const postsListStyles = () => ({
  padding: 0,
  overflowY: `auto`,
});

const itemButton = () => ({
  display: `flex`,
  justifyContent: `flex-start`,
  width: `100%`,
  color: `${Color.WHITE}`,
  textTransform: `none`,
  border: `1px solid ${Color.WHITE}`,
  borderRadius: `4px`,
});

const avatarStyles = (): {
  [key: string]: number | string;
} => ({
  width: 56,
  height: 56,
  marginRight: 2,
});

const info = () => ({
  textAlign: `left`,
});


export const styles = {
  avatarStyles,
  containerStyles,
  info,
  itemButton,
  postsListStyles,
};
