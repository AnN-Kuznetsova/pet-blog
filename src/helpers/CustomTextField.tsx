import React, { ReactNode } from "react";
import { FormikProps } from "formik";
import { TextField } from "@mui/material";

import { POST_TEXT_ROWS_COUNT } from "./constants";


interface PropsType<T> {
  name: string;
  label?: string;
  formik: FormikProps<T>;
  error: boolean | undefined;
  disabled: boolean;
  multiline?: boolean | undefined;
  styles?: object;
  placeholder?: string;
  inputProps?: object;
}


export const CustomTextField = <T extends {[key: string]: string | number}>(props: PropsType<T>): JSX.Element => {
  const {
    name,
    label,
    multiline = false,
    formik,
    error,
    disabled,
    styles,
    placeholder,
    inputProps,
  } = props;

  const helperText: ReactNode = formik.touched[name] ? <>{formik.errors[name]}</> : null;

  return (
    <TextField
      id={name}
      name={name}
      label={label}
      multiline={multiline}
      value={formik.values[name] ? formik.values[name] : ``}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      error={error}
      helperText={helperText}
      disabled={disabled}
      sx={styles}
      rows={multiline ? POST_TEXT_ROWS_COUNT : undefined}
      placeholder={placeholder}
      inputProps={inputProps}
    />
  );
};
