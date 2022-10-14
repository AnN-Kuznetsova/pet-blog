import type { AvatarSize } from "./user-avatar";

const avatar = (size: AvatarSize): {
  [key: string]: number | string;
} => ({
  width: size,
  height: size,
});


export const styles = {
  avatar,
};
