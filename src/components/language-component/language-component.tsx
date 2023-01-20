import React, { useEffect, useState } from "react";
import LanguageIcon from "@mui/icons-material/Language";
import i18next from "i18next";
import { useDispatch, useSelector } from "react-redux";

import { SelectedMenu } from "../selected-menu/selected-menu";
import { getLanguage } from "../../store/application/selectors";
import { useLanguageLabel, useSnackbarMessage } from "../../hooks/useLabels";
import { SnackTypeRaw } from "../../types/types";
import { SnackbarType } from "../../types/additional-types";
import { addSnack, changeLanguage } from "../../store/application/application";
import { Languages } from "../../i18n";


const languages = Object.values(Languages);


export const LanguageComponent: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const language = useSelector(getLanguage);
  const languagesLabel = useLanguageLabel();
  const [isLoading, setIsLoading] = useState(false);
  const snackbarMessage = useSnackbarMessage();
  const [newChosenLanguage, setNewChosenLanguage] = useState(language);

  const [languageError, setLanguageError] = useState(() => {
    const errorState: {[key: string]: boolean} = {};
    i18next.languages.forEach((language) => errorState[language] = false);
    return errorState;
  });

  const handleLanguageChange = (option: string) => {
    const newLanguage = Object.values(Languages).find((lang) => lang === option) || Languages.EN;
    setNewChosenLanguage(newLanguage);
    setIsLoading(true);

    i18next.loadLanguages(newLanguage, (err) => {
      if (err) {
        const snack: SnackTypeRaw = {
          id: new Date().getTime(),
          type: SnackbarType.ERROR,
          message: snackbarMessage[SnackbarType.ERROR],
        };

        dispatch(addSnack(snack));
        setIsLoading(false);
      } else {
        if (languageError[newLanguage]) {
          i18next.reloadResources([newLanguage])
            .then(() => setIsLoading(false));
        } else {
          setIsLoading(false);
        }
      }
    });
  };

  i18next.on(`failedLoading`, (lng) => {
    setNewChosenLanguage(language);

    setLanguageError({
      ...languageError,
      [lng]: true,
    });
  });

  i18next.on(`loaded`, (loaded) => {
    const lng = Object.keys(loaded)[0];
    const loadedResourceBundle = i18next.getResourceBundle(lng, `translation`);

    if (Object.keys(loadedResourceBundle).length) {
      setLanguageError({
        ...languageError,
        [lng]: false,
      });

      setNewChosenLanguage(lng as Languages);
    }
  });

  useEffect(() => {
    if (languageError[newChosenLanguage] !== undefined && !languageError[newChosenLanguage]) {
      dispatch(changeLanguage(newChosenLanguage as Languages));
      i18next.changeLanguage(newChosenLanguage);
    }
  }, [newChosenLanguage, languageError, dispatch]);

  return (
    <SelectedMenu
      name="language"
      label="Selected language"
      iconComponent={<LanguageIcon />}
      options={languages}
      optionsLabel={languagesLabel}
      selectedOption={language}
      isLoading={isLoading}
      onChange={handleLanguageChange}
    />
  );
};
