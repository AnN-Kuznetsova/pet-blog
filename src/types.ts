interface PostType {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface UserType {
  id: number;
  avatar: string | null;
  name: string;
}


export type {
  PostType,
  UserType,
};
