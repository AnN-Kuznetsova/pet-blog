import * as Yup from "yup";
import React from "react";
import { Box, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { ModalType } from "../../helpers/constants";
import { SnackbarType } from "../snack/snack";
import { getModalType } from "../../store/application/selectors";
import { setModalType, addSnack } from "../../store/application/application";
import { styles } from "./styles";
import { useAddNewPostMutation, useEditPostMutation } from "../api/postsSlice";
import { usePost } from "../../hooks/usePost";
import type { PostType, SnackTypeRaw } from "../../types";
import { usePostFormButtonControls } from "./usePostFormButtonControls";


interface PropsType {
  onModalClose: () => void;
}

interface PostFormValuesType {
  title: string;
  body: string;
}


const POST_TEXT_ROWS_COUNT = 5;

const SnackbarMessage: Record<SnackbarType, string> = {
  [SnackbarType.SUCCESS]: `It\`s Successful Success!`,
  [SnackbarType.ERROR]: `It\`s Fiasco Bro :(`,
};

const validationSchema = Yup.object({
  title: Yup.string()
    .max(15, `Must be 15 characters or less`)
    .required(`Required`),
  body: Yup.string()
    .max(50, `Must be 50 characters or less`)
    .required(`Required`),
});


export const PostForm: React.FC<PropsType> = (props) => {
  const {onModalClose} = props;
  const dispatch = useDispatch();
  const modalType = useSelector(getModalType);
  const [addNewPost, {isLoading: isAddPostLoading}] = useAddNewPostMutation();
  const [editPost, {isLoading: isEditPostLoading}] = useEditPostMutation();
  const post = usePost();
  const userId = post ? post.userId : ``;
  const formDisabled = isAddPostLoading || isEditPostLoading;

  const getError = (touched?: boolean, error?: string) => {
    const isNewPost = modalType === ModalType.ADD_POST;

    return isNewPost ?
      touched && Boolean(error)
      : Boolean(error);
  };

  const handleSubmit = async (values: PostFormValuesType) => {
    const newPostData: PostType | Omit<PostType, `id`> = {
      id: post ? post.id : undefined,
      userId: userId,
      date: new Date().toString(),
      title: values.title,
      body: values.body,
    };

    try {
      if ((newPostData as PostType).id) {
        await editPost(newPostData as PostType).unwrap();
      } else {
        await addNewPost(newPostData).unwrap();
      }
      const snack: SnackTypeRaw = {
        id: new Date().getTime(),
        type: SnackbarType.SUCCESS,
        message: SnackbarMessage[SnackbarType.SUCCESS],
      };

      dispatch(setModalType(ModalType.NO_MODAL));
      dispatch(addSnack(snack));
    } catch (error: unknown) {
      const snack: SnackTypeRaw = {
        id: new Date().getTime(),
        type: SnackbarType.ERROR,
        message: SnackbarMessage[SnackbarType.ERROR],
      };

      dispatch(addSnack(snack));
    }
  };

  const formik = useFormik({
    initialValues: {
      title: post ? post.title : ``,
      body: post ? post.body : ``,
    },
    validationSchema,
    validateOnMount: true,
    onSubmit: handleSubmit,
    initialTouched: {
      title: false,
      body: false,
    },
  });

  usePostFormButtonControls(onModalClose, formik.isValid);

  return (
    <form
      id={`${modalType}`}
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
            error={getError(formik.touched.title, formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
            disabled={formDisabled}
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
            error={getError(formik.touched.body,formik.errors.body)}
            helperText={formik.touched.body && formik.errors.body}
            disabled={formDisabled}
            sx={styles.control}
            rows={POST_TEXT_ROWS_COUNT}
          />
        </Box>
      </Box>
    </form>
  );
};
