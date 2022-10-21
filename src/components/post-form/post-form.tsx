import React from "react";
import { Box, FormControl, Input, InputLabel } from "@mui/material";
import { useFormik } from "formik";
import { useSelector } from "react-redux";

import { ControlButtonType, FormButtonControlsType, FormButtonControls } from "../form-button-controls/form-button-controls";
import { ModalType } from "../../helpers/constants";
import { styles } from "./styles";
import { usePost } from "../../hooks/usePost";
import { getModalType } from "../../store/application/selectors";


interface PropsType {
  onModalClose: () => void;
}

const validationSchema = () => ({});


export const PostForm: React.FC<PropsType> = (props) => {
  const {onModalClose} = props;
  const post = usePost();
  const modalType = useSelector(getModalType);
  const controlButtons: ControlButtonType[] = [];

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

  const handleCancel = () => {
    onModalClose();
  };

  if (modalType === ModalType.ADD_POST) {
    controlButtons.push({
      type: FormButtonControlsType.SAVE,
      // isDisabled?: boolean;
      isSubmit: true,
    });
  } else if (modalType === ModalType.EDIT_POST) {
    controlButtons.push({
      type: FormButtonControlsType.SEND,
      // isDisabled?: boolean;
      isSubmit: true,
    });
  }

  controlButtons.push({
    type: FormButtonControlsType.CANCEL,
    onClick: handleCancel,
  });

  return (
    <Box sx={styles.container}>
      <form onSubmit={formik.handleSubmit}>
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

        <FormButtonControls buttons={controlButtons} />
      </form>
    </Box>
  );
};
