import React from "react";
import { Box, Typography } from "@mui/material";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";
import { useTranslation } from "react-i18next";

import { styles } from "./styles";


export type ErrorType = FetchBaseQueryError | SerializedError | number | undefined;

interface PropsType {
  error: ErrorType;
}

const Error: {
  [key: string]: number[];
} = {
  PAGE_NOT_FOUND: [404],
  SERVER: [500],
};

// const getErrorMessage = (error: number) => {
//   switch (error) {
//     case Error.PAGE_NOT_FOUND:
//       return `Page not found.`;

//     case Error.SERVER:
//       return `Server not available.\nPlease try again later.`;

//     default:
//       return `The request failed`;
//   }
// };


export const ErrorPage: React.FC<PropsType> = (props): JSX.Element => {
  const {error: errorRaw} = props;
  const {t} = useTranslation();

  let error: {
    status: number | null,
    message: string,
  } = {
    status: null,
    message: ``,
  };

  const getErrorMessage = (errorCode: number) => {
    const errorKey = Object.keys(Error)
      .find((key) => Error[key].includes(errorCode))
      ?.toLocaleLowerCase()
      .replaceAll(`_`, `-`);

    return t([`error.${errorKey}`, `error.unknown`]);
  };

  if (errorRaw) {
    if (typeof errorRaw === `number`) {
      error = {
        status: errorRaw,
        message: getErrorMessage(errorRaw),
      };
    } else {
      if (`status` in errorRaw) {
        // `FetchBaseQueryError`
        if (typeof errorRaw.status === `number`) {
          error = {
            status: errorRaw.status,
            message: getErrorMessage(errorRaw.status),
          };
        } else if (`originalStatus` in errorRaw) {
          error = {
            status: errorRaw.originalStatus,
            message: getErrorMessage(errorRaw.originalStatus),
          };
        } else {
          error.message = `error` in errorRaw ? errorRaw.error : JSON.stringify(errorRaw.data);
        }
      } else {
        // `SerializedError`
        error.message = errorRaw.message ? errorRaw.message : `Something went wrong...`;
      }
    }
  }

  return (
    <Box sx={styles.container}>
      {error.status &&
        <Typography
          variant="h1"
          sx={styles.title}
        >
          {error.status}
        </Typography>
      }

      <Typography sx={styles.text}>
        {error.message}
      </Typography>
    </Box>
  );
};
