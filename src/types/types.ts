import { SnackbarType } from "./additional-types";


interface PostType {
  userId: string;
  id: string;
  title: string;
  date: string;
  body: string;
}

interface UserType {
  id: string;
  avatar: string | null;
  name: string;
}

interface SnackTypeRaw {
  id: number
  type: SnackbarType;
  message: string;
}

type SnackType = SnackTypeRaw & {
  isOpen: boolean;
  isTimeout: boolean;
};


export type {
  PostType,
  UserType,
  SnackTypeRaw,
  SnackType,
};
