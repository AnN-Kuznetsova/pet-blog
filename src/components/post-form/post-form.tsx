import * as Yup from "yup";
import React from "react";
import { Box, TextField } from "@mui/material";
import { useFormik } from "formik";

import { styles } from "./styles";
import { usePost } from "../../hooks/usePost";
import { PostType } from "../../types";


interface PropsType {
  formSubmitId: string;
}

const validationSchema = Yup.object({
  title: Yup.string()
    .max(15, `Must be 15 characters or less`)
    .required(`Required`),
  body: Yup.string()
    .max(50, `Must be 50 characters or less`)
    .required(`Required`),
});


export const PostForm: React.FC<PropsType> = (props) => {
  const {formSubmitId} = props;
  const post = usePost();
  const userId = post ? post.userId : ``;

  const formik = useFormik({
    initialValues: {
      title: post ? post.title : ``,
      body: post ? post.body : ``,
    },
    validationSchema,
    onSubmit: (values) => {
      const newPostData: PostType | Omit<PostType, `id`> = {
        id: post ? post.id : undefined,
        userId: userId,
        date: new Date().toString(),
        title: values.title,
        body: values.body,
      };

      console.log(newPostData);

    },
    initialTouched: {
      title: false,
      body: false,
    },
  });

  return (
    <form
      id={formSubmitId}
      onSubmit={formik.handleSubmit}
    >
      <Box sx={styles.container}>
        <Box sx={styles.wrapper}>
          <TextField
            id="title"
            name="title"
            label="Header"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
            sx={styles.control}
            // autoFocus={true}
          />

          <TextField
            id="body"
            name="body"
            label="Post Text"
            multiline
            value={formik.values.body}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.body && Boolean(formik.errors.body)}
            helperText={formik.touched.body && formik.errors.body}
            sx={styles.control}
          />
        </Box>
      </Box>
    </form>
  );
};
