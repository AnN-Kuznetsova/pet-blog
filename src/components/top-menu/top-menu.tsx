import React from "react";
import { Box, Button } from "@mui/material";
import { Link, useMatch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import { AppRoute, ModalType } from "../../helpers/constants";
import { Languages } from "../../i18n";
import { SelectedMenu } from "../selected-menu/selected-menu";
import { changeLanguage, setModalType } from "../../store/application/application";
import { styles } from "./styles";
import { useGetPostsQueryState } from "../api/postsSlice";


const languages = Object.values(Languages);


export const TopMenu: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const {isSuccess: isPostsSuccess} = useGetPostsQueryState();
  const isMainPage = useMatch(AppRoute.MAIN);
  const isPostPage = useMatch(AppRoute.POST_PAGE);

  const hanleAddPostButtonClick = async () => {
    dispatch(setModalType(ModalType.ADD_POST));
  };

  const hanleEditPostButtonClick = async () => {
    dispatch(setModalType(ModalType.EDIT_POST));
  };

  const handleLanguageChange = (option: string) => {
    const language = Object.values(Languages).find((lang) => lang === option) || Languages.EN;
    dispatch(changeLanguage(language));
  };

  return (
    <Box sx={styles.container}>
      {isMainPage &&
        <Button
          type="button"
          variant="contained"
          onClick={hanleAddPostButtonClick}
          disabled={!isPostsSuccess}
        >
          {t(`button.post.add`)}
        </Button>
      }

      {!isMainPage &&
        <Link to={AppRoute.MAIN}>
          <Button
            variant="contained"
            disabled={!isPostsSuccess}
          >
            {t(`button.home`)}
          </Button>
        </Link>
      }

      {isPostPage &&
        <Button
          type="button"
          variant="contained"
          onClick={hanleEditPostButtonClick}
          disabled={!isPostsSuccess}
        >
          {t(`button.post.edit`)}
        </Button>
      }

      <Box sx={styles.rightMenu}>
        <SelectedMenu
          name="language"
          label="Selected language"
          options={languages}
          onChange={handleLanguageChange}
        />
      </Box>
    </Box>
  );
};
