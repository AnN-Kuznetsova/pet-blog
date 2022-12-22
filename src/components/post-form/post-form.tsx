import * as Yup from "yup";
import React from "react";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { ModalType } from "../../helpers/constants";
import { SnackbarType } from "../snack/snack";
import { getModalType } from "../../store/application/selectors";
import { setModalType, addSnack } from "../../store/application/application";
import { styles } from "./styles";
import { useAddNewPostMutation, useEditPostMutation } from "../api/postsSlice";
import { usePost } from "../../hooks/usePost";
import { usePostFormButtonControls } from "./usePostFormButtonControls";
import {
  calcPostDate,
  DateMeasureTitle,
  DateMeasureType,
  PostDateLabel,
  PostDateMode,
  POST_TEXT_ROWS_COUNT,
  SnackbarMessage,
} from "./helpers";
import type { PostType, SnackTypeRaw } from "../../types";
import { DateFormatMode, formatDate } from "../../helpers/utils";


interface PropsType {
  onModalClose: () => void;
}

interface PostFormValuesType {
  title: string;
  body: string;
  dateMode: PostDateMode;
  addDate: number;
  measure: DateMeasureType,
}

const validationSchema = Yup.object({
  title: Yup.string()
    .max(15, `Must be 15 characters or less`)
    .required(`Required`),
  body: Yup.string()
    .max(50, `Must be 50 characters or less`)
    .required(`Required`),
  addDate: Yup.number()
    .typeError(`Must be only a number`)
    .when(`dateMode`, {
      is: (val: PostDateMode) => val === PostDateMode.IN_FUTURE,
      then: (schema) => schema
        .integer(`Must be integer`)
        .positive(`Must be positive`)
        .required(`Required`),
    }),
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
      date: postDate,
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
      dateMode: PostDateMode.TODAY,
      addDate: 0,
      measure: DateMeasureType.DAY,
    },
    validationSchema,
    validateOnMount: true,
    onSubmit: handleSubmit,
    initialTouched: {
      title: false,
      body: false,
      dateMode: true,
      addDate: false,
      measure: true,
    },
  });

  const isPostDateToday = formik.values.dateMode === PostDateMode.TODAY;

  const postDate = calcPostDate({
    dateMode: formik.values.dateMode,
    duration: formik.values.addDate,
    measure: formik.values.measure,
  });
  const formattedPostDate = formatDate(postDate, DateFormatMode.LONG);

  usePostFormButtonControls(onModalClose, formik.isValid);

  return (
    <form
      id={`${modalType}`}
      onSubmit={formik.handleSubmit}
    >
      <Box sx={styles.container}>
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
          autoFocus={true}
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

        <FormControl>
          <FormLabel id="post-date-group-label">Post Date:</FormLabel>
          <Typography
            variant="h6"
            sx={styles.postDate}
          >
            {formattedPostDate}
          </Typography>
          <RadioGroup
            id="dateMode"
            name="dateMode"
            aria-labelledby="post-date-group-label"
            value={formik.values.dateMode}
            onChange={formik.handleChange}
          >
            {Object.entries(PostDateMode).map(([dateModeKey, dateModeValue]) => (
              <FormControlLabel
                key={dateModeKey}
                value={dateModeValue}
                control={<Radio />}
                label={PostDateLabel[dateModeValue]}
              />
            ))}
          </RadioGroup>

          {!isPostDateToday &&
            <Box>
              <TextField
                id="addDate"
                name="addDate"
                value={formik.values.addDate ? formik.values.addDate : ``}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={formDisabled}
                error={getError(formik.touched.addDate,formik.errors.addDate)}
                helperText={formik.touched.addDate && formik.errors.addDate}
                inputProps={{ pattern: "[0-9]*" }}
                placeholder="Input number of..."
                sx={styles.addDate}
              />

              <Select
                id="measure"
                name="measure"
                value={formik.values.measure}
                onChange={formik.handleChange}
                sx={styles.measure}
              >
                {Object.entries(DateMeasureType).map(([measureType, measureValue]) => (
                  <MenuItem
                    key={measureType}
                    value={measureValue ? measureValue : ``}
                  >
                    {DateMeasureTitle[measureValue]}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          }
        </FormControl>
      </Box>
    </form>
  );
};
