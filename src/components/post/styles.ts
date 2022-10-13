import { darken, Theme } from "@mui/material";
import { Color } from "../../constants";


const postButton = (theme: Theme) => ({
  color: Color.WHITE,
  borderColor: Color.WHITE,
  transition: `all 0.2s`,

  "&:hover": {
    color: theme.palette.primary.main,
  },

  "&.MuiLoadingButton-loading": {
    borderColor: Color.WHITE,
    backgroundColor: Color.WHITE,
    opacity: 0.8,
  },

  "& .MuiLoadingButton-loadingIndicator": {
    color: `${darken(theme.palette.primary.light, 0.5)}`,
  },
});

const userInfo = () => ({
  display: `flex`,
  alignItems: `flex-end`,
});

export const styles = {
  postButton,
  userInfo,
};
