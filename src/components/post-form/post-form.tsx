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
  Typography,
} from "@mui/material";
import { FormikProps, useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import type { TFunction } from "i18next";

import { CustomTextField as CustomTextFieldRaw } from "../../helpers/CustomTextField";
import { calcPostDate, DateFormatMode, formatDate } from "../../helpers/utils";
import { ModalType } from "../../helpers/constants";

import { getLanguage, getModalType } from "../../store/application/selectors";
import { setModalType, addSnack } from "../../store/application/application";
import { styles } from "./styles";
import { useAddNewPostMutation, useEditPostMutation } from "../api/postsSlice";
import { useDateMeasureTitle, usePostDateLabel, useSnackbarMessage } from "../../hooks/useLabels";
import { usePost } from "../../hooks/usePost";
import { usePostFormButtonControls } from "./usePostFormButtonControls";
import {
  DateMeasureType,
  PostDateMode,
  SnackbarType,
} from "../../types/additional-types";
import type { PostType, SnackTypeRaw } from "../../types/types";


interface PropsType {
  onModalClose: () => void;
}

interface PostFormValuesType {
  [key: string]: string | number;
  title: string;
  body: string;
  dateMode: PostDateMode;
  addDate: number;
  measure: DateMeasureType,
}

const getValidationSchema = (t: TFunction<"translation", undefined, "translation">) => {
  return Yup.object({
    title: Yup.string()
      .max(15, `${t(`validation.maxLength`, {count: 15})}`)
      .required(`${t(`validation.required`)}`),
    body: Yup.string()
      .max(50, `${t(`validation.maxLength`, {count: 50})}`)
      .required(`${t(`validation.required`)}`),
    addDate: Yup.number()
      .typeError(`${t(`validation.mustBe.aNumber`)}`)
      .when(`dateMode`, {
        is: (val: PostDateMode) => val === PostDateMode.IN_FUTURE,
        then: (schema) => schema
          .integer(`${t(`validation.mustBe.integer`)}`)
          .positive(`${t(`validation.mustBe.positive`)}`)
          .required(`${t(`validation.required`)}`),
      }),
  });
};

const CustomTextField = CustomTextFieldRaw<PostFormValuesType>;


export const PostForm: React.FC<PropsType> = (props) => {
  const {onModalClose} = props;
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const modalType = useSelector(getModalType);
  const language = useSelector(getLanguage);
  const [addNewPost, {isLoading: isAddPostLoading}] = useAddNewPostMutation();
  const [editPost, {isLoading: isEditPostLoading}] = useEditPostMutation();
  const post = usePost();
  const userId = post ? post.userId : ``;
  const formDisabled = isAddPostLoading || isEditPostLoading;
  const dateMeasureTitle = useDateMeasureTitle();
  const postDateModeLabel = usePostDateLabel();
  const snackbarMessage = useSnackbarMessage();
  const validationSchema = getValidationSchema(t);

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
        message: snackbarMessage[SnackbarType.SUCCESS],
      };

      dispatch(setModalType(ModalType.NO_MODAL));
      dispatch(addSnack(snack));
    } catch (error: unknown) {
      const snack: SnackTypeRaw = {
        id: new Date().getTime(),
        type: SnackbarType.ERROR,
        message: snackbarMessage[SnackbarType.ERROR],
      };

      dispatch(addSnack(snack));
    }
  };

  const formik: FormikProps<PostFormValuesType> = useFormik<PostFormValuesType>({
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
    duration: +formik.values.addDate,
    measure: formik.values.measure,
  });
  const formattedPostDate = formatDate(postDate, language, DateFormatMode.LONG);

  usePostFormButtonControls(onModalClose, formik.isValid);

  return (
    <form
      id={`${modalType}`}
      onSubmit={formik.handleSubmit}
    >
      <Box sx={styles.container}>
        <CustomTextField
          name="title"
          label={`${t(`post.form.title`)}`}
          formik={formik}
          error={getError(formik.touched.title, formik.errors.title)}
          disabled={formDisabled}
          styles={styles.control}
        />

        <CustomTextField
          name="body"
          label={`${t(`post.form.text`)}`}
          multiline={true}
          formik={formik}
          error={getError(formik.touched.body, formik.errors.body)}
          disabled={formDisabled}
          styles={styles.control}
        />

        <FormControl>
          <FormLabel id="post-date-group-label">{t(`post.form.date.title`)}:</FormLabel>
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
                label={postDateModeLabel[dateModeValue]}
              />
            ))}
          </RadioGroup>

          {!isPostDateToday &&
            <Box>
              <CustomTextField
                name="addDate"
                formik={formik}
                error={getError(formik.touched.addDate,formik.errors.addDate)}
                disabled={formDisabled}
                styles={styles.addDate}
                placeholder={`${t(`post.form.date.placeholder`)}`}
                inputProps={{ pattern: "[0-9]*" }}
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
                    {dateMeasureTitle[measureValue]}
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
