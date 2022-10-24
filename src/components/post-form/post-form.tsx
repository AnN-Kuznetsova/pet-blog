import React from "react";
import { Box, FormControl, Input, InputLabel } from "@mui/material";
import { useFormik } from "formik";

import { styles } from "./styles";
import { usePost } from "../../hooks/usePost";


interface PropsType {
  formSubmitId: string;
}

const validationSchema = () => ({});


export const PostForm: React.FC<PropsType> = (props) => {
  const {formSubmitId} = props;
  const post = usePost();

  const formik = useFormik({
    initialValues: {
      // id: string;
      // userId: post ? post.userId : ``,
      title: post ? post.title : ``,
      // date: post ? post.date : ``,
      body: post ? post.body : ``,
    },
    validationSchema,
    onSubmit: (values) => {
      //
    },
    initialTouched: {

    },
  });

  return (
    <form
      id={formSubmitId}
      onSubmit={formik.handleSubmit}
    >
      <Box sx={styles.container}>
        <Box sx={styles.wrapper}>
          <FormControl sx={styles.control}>
            <InputLabel htmlFor="title">Header</InputLabel>
            <Input
              id="title"
              name="title"
              type="text"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              // autoFocus={true}
            />
          </FormControl>

          <FormControl sx={styles.control}>
            <InputLabel htmlFor="text">Text</InputLabel>
            <Input
              id="text"
              name="text"
              type="text"
              value={formik.values.body}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </FormControl>
        </Box>
      </Box>
    </form>
  );
};
