const STING_AVATAR_LETTERS_COUNT = 3;

const stringToColor = (string: string): string => {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = `#`;

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
};


export const createStringAvatar = (name: string): {
  sx: {
    [key: string]: number | string;
  };
  children: string;
} => {
  const avatar = name.split(" ")
    .reduce((accum, nameItem) => accum + nameItem[0].toUpperCase(), ``)
    .slice(0, STING_AVATAR_LETTERS_COUNT);

  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: avatar,
  };
};
