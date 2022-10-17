import { Avatar } from "@mui/material";
import React from "react";

import { createStringAvatar } from "./create-string-avatar";
import { styles } from "./styles";
import type { UserType } from "../../types";


interface PropsType {
  user: UserType | undefined;
  styles?: {[key: string]: number | string};
  size?: AvatarSize;
}


export enum AvatarSize {
  MIDDLE = 56,
  BIG = 100,
}


export const UserAvatar: React.FC<PropsType> = (props): JSX.Element => {
  const {
    user,
    styles: stylesRaw,
    size = AvatarSize.MIDDLE,
  } = props;

  const avatarStyles = {
    ...stylesRaw,
    ...styles.avatar(size),
  };

  const stringAvatar:
    ReturnType<typeof createStringAvatar> |
    ReturnType<typeof createStringAvatar> & {sx: { [key: string]: number | string }} |
    null = user && !user.avatar ? createStringAvatar(user.name) : null;

  if (stringAvatar && stringAvatar.sx) {
    Object.entries(avatarStyles).forEach(([key, value]) => {
      stringAvatar.sx[key] = value;
    });
  }

  return (
    <>
      {!user && <Avatar sx={avatarStyles}/>}
      {user && user.avatar &&
        <Avatar
          src={`${user.avatar}`}
          alt=""
          sx={avatarStyles}
        />
      }
      {user && !user.avatar &&
        <Avatar
          {...stringAvatar}
        />
      }
    </>
  );
};
