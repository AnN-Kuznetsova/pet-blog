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


export type {
  PostType,
  UserType,
};
