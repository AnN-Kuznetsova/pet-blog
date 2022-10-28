import * as Yup from "yup";
import React, { useEffect } from "react";
import { Box, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";

import { ModalType } from "../../helpers/constants";
import { ModalButtonControlsType } from "../modal-button-controls/modal-button-controls";
import { getModalType } from "../../store/application/selectors";
import { setModalButtonControls } from "../../store/application/application";
import { styles } from "./styles";
import { useAddNewPostMutation, useEditPostMutation } from "../../store/posts/postsSlice";
import { usePost } from "../../hooks/usePost";
import type { PostType } from "../../types";


const PostTextRowsCount = 5;

interface PropsType {
  onModalClose: () => void;
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
  const {onModalClose} = props;
  const dispatch = useDispatch();
  const modalType = useSelector(getModalType);
  const [addNewPost, {isLoading: isAddPostLoading}] = useAddNewPostMutation();
  const [editPost, {isLoading: isEditPostLoading}] = useEditPostMutation();
  const post = usePost();
  const userId = post ? post.userId : ``;
  const formDisabled = isAddPostLoading || isEditPostLoading;

  const formik = useFormik({
    initialValues: {
      title: post ? post.title : ``,
      body: post ? post.body : ``,
    },
    validationSchema,
    onSubmit: async (values) => {
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
      } catch (error: unknown) {
        console.error(`Failed to save the post: `, error);
      }
    },
    initialTouched: {
      title: false,
      body: false,
    },
  });

  useEffect(() => {
    const buttonControls = [];
    const isNewData = !post && Object.values(formik.touched).every((touch) => touch === true);

    if(modalType === ModalType.ADD_POST) {
      buttonControls.push({
        label: ModalButtonControlsType.SAVE,
        formSubmitId: `${modalType}`,
        isDisabled: !(formik.isValid && isNewData) || isAddPostLoading,
        isLoading: isAddPostLoading,
      });
    }

    if (modalType === ModalType.EDIT_POST) {
      buttonControls.push({
        label: ModalButtonControlsType.SEND,
        formSubmitId: `${modalType}`,
        isDisabled: !(formik.isValid && isNewData) || isEditPostLoading,
        isLoading: isEditPostLoading,
      });
    }

    buttonControls.push({
      label: ModalButtonControlsType.CANCEL,
      onClick: onModalClose,
      isDisabled: formDisabled,
    });

    dispatch(setModalButtonControls(buttonControls));
  }, [
    dispatch,
    isAddPostLoading,
    isEditPostLoading,
    modalType,
    onModalClose,
    formDisabled,
    formik.isValid,
    formik.touched,
    post,
  ]);

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
            error={formik.touched.title && Boolean(formik.errors.title)}
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
            error={formik.touched.body && Boolean(formik.errors.body)}
            helperText={formik.touched.body && formik.errors.body}
            disabled={formDisabled}
            sx={styles.control}
            rows={PostTextRowsCount}
          />
        </Box>
      </Box>
    </form>
  );
};
