import { SnackbarType } from "./components/snack/snack";


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

interface SnackType {
  id: number
  type: SnackbarType;
  message: string;
  isOpen: boolean;
}


export type {
  PostType,
  UserType,
  SnackType,
};
