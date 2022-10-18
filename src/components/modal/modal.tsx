import React from "react";
import ReactDOM from "react-dom";
import { Button, Modal } from "@mui/material";
import { useSelector } from "react-redux";
import { getModalType } from "../../store/application/selectors";
import { PostForm } from "../post-form/post-form";
import { Box } from "@mui/system";


const modalContainer = document.querySelector(`#modal-root`);


export enum ModalType {
  NO_MODAL,
  ADD_POST,
  EDIR_POST,
}


// interface PropsType {
//  children: ReactNode;
// }


export const BasicModal: React.FC = (): JSX.Element | null => {
  const modalType = useSelector(getModalType);

  return modalContainer ? ReactDOM.createPortal(
    // <Modal
    //   open={modalType === ModalType.ADD_POST}
    // >
    <Box>
      <Button></Button>

      {modalType === ModalType.ADD_POST &&
        <PostForm />
      }

    </Box>,
    // </Modal>,
    modalContainer
  ) : null;
};
