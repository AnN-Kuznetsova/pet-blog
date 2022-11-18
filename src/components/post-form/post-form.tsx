import * as Yup from "yup";
import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Box, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useSelector } from "react-redux";

import { ModalType } from "../../helpers/constants";
import { ControlButtonType, ModalButtonControlsType } from "../modal-button-controls/modal-button-controls";
import { ModalButtonsContext } from "../basic-modal/basic-modal";
import { getModalType } from "../../store/application/selectors";
import { styles } from "./styles";
import { useAddNewPostMutation, useEditPostMutation } from "../../store/posts/postsSlice";
import { usePost } from "../../hooks/usePost";
import type { PostType } from "../../types";


const PostTextRowsCount = 5;

interface PropsType {
  onModalClose: () => void;
}

type ButtonControlsType = Partial<Record<ModalButtonControlsType, ControlButtonType>>;

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
  const modalType = useSelector(getModalType);
  const [addNewPost, {isLoading: isAddPostLoading}] = useAddNewPostMutation();
  const [editPost, {isLoading: isEditPostLoading}] = useEditPostMutation();
  const post = usePost();
  const userId = post ? post.userId : ``;
  const formDisabled = isAddPostLoading || isEditPostLoading;

  const [modalButtonControls, setModalButtonControls] = useContext(ModalButtonsContext);

  const formik = useFormik({
    initialValues: {
      title: post ? post.title : ``,
      body: post ? post.body : ``,
    },
    validationSchema,
    validateOnMount: true,
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

  const [buttonControls, setButtonControls]: [
    ButtonControlsType,
    React.Dispatch<React.SetStateAction<ButtonControlsType>>,
  ] = useState({
    [ModalButtonControlsType.SAVE]: {
      label: ModalButtonControlsType.SAVE,
      formSubmitId: `${modalType}`,
      isDisabled: !formik.isValid || isAddPostLoading,
      isLoading: isAddPostLoading,
    },
    [ModalButtonControlsType.SEND]: {
      label: ModalButtonControlsType.SEND,
      formSubmitId: `${modalType}`,
      isDisabled: formik.isValid || isEditPostLoading,
      isLoading: isEditPostLoading,
    },
    [ModalButtonControlsType.CANCEL]: {
      label: ModalButtonControlsType.CANCEL,
      onClick: onModalClose,
      isDisabled: formDisabled,
    },
  } as ButtonControlsType);

  const updateButtonControls = useCallback((buttonType: ModalButtonControlsType, buttonLoading: boolean) => {
    if (
      buttonControls[buttonType]?.isDisabled !== (!formik.isValid || buttonLoading) ||
      buttonControls[buttonType]?.isLoading !== buttonLoading
    ) {
      setButtonControls({
        ...buttonControls,
        [buttonType]: {
          ...buttonControls[buttonType],
          isDisabled: !formik.isValid || buttonLoading,
          isLoading: buttonLoading,
        } as ControlButtonType,
      });
    }
  }, [
    formik.isValid,
    buttonControls,
  ]);

  const getError = (touched?: boolean, error?: string) => {
    const isNewPost = modalType === ModalType.ADD_POST;

    return isNewPost ?
      touched && Boolean(error)
      : Boolean(error);
  };

  useEffect(() => {
    if(modalType === ModalType.ADD_POST) {
      setModalButtonControls([
        buttonControls[ModalButtonControlsType.SAVE],
        buttonControls[ModalButtonControlsType.CANCEL],
      ] as ControlButtonType[]);
    }

    if(modalType === ModalType.EDIT_POST) {
      setModalButtonControls([
        buttonControls[ModalButtonControlsType.SEND],
        buttonControls[ModalButtonControlsType.CANCEL],
      ] as ControlButtonType[]);
    }
  }, [
    setModalButtonControls,
    modalType,
    buttonControls,
  ]);

  useEffect(() => {
    updateButtonControls(ModalButtonControlsType.SAVE, isAddPostLoading);
    updateButtonControls(ModalButtonControlsType.SEND, isEditPostLoading);
  }, [
    isAddPostLoading,
    isEditPostLoading,
    updateButtonControls,
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
            rows={PostTextRowsCount}
          />
        </Box>
      </Box>
    </form>
  );
};
