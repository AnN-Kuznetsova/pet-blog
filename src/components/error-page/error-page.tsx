import React from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";

import { styles } from "./styles";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";


type ErrorType = FetchBaseQueryError | SerializedError | number | undefined;

interface PropsTypes {
  error: ErrorType;
}

enum Error {
  PAGE_NOT_FOUND = 404,
  SERVER = 500,
}

const getErrorMessage = (error: number) => {
  switch (error) {
    case Error.PAGE_NOT_FOUND:
      return `Page not found.`;

    case Error.SERVER:
      return `Server not available.\nPlease try again later.`;

    default:
      return `The request failed`;
  }
};


export const ErrorPage: React.FC<PropsTypes> = (props): JSX.Element => {
  const {error: errorRaw} = props;

  let error: {
    status: number | null,
    message: string,
  } = {
    status: null,
    message: ``,
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
