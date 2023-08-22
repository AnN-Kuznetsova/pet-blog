import { blue, grey } from "@mui/material/colors";
import { createTheme, darken } from "@mui/material";


const Color = {
  WHITE: grey[100],
  BLUE: darken(blue[400], 0.5),
  DARK_BLUE: darken(blue[800], 0.7),
  LIGHT_BLUE: darken(blue[400], 0.3),
  GREY: grey[600],
};


export const THEME = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: Color.WHITE,
          boxShadow: "none",

          "&:hover": {
            backgroundColor: Color.LIGHT_BLUE,
            boxShadow: "none",
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        colorDefault: {
          color: Color.WHITE,
        },
      },
    },
  },

  palette: {
    mode: `dark`,
    primary: {
      main: Color.BLUE,
      dark: Color.DARK_BLUE,
      light: Color.LIGHT_BLUE,
      contrastText: Color.WHITE,
    },
    background: {
      default: darken(Color.BLUE, 0.4),
      paper: darken(Color.BLUE, 0.4),
    },
    text: {
      primary: Color.WHITE,
      secondary: Color.WHITE,
    },
    action: {
      hover: Color.LIGHT_BLUE,
      hoverOpacity: 0.2,
      disabled: darken(Color.WHITE, 0.2),
      disabledBackground: Color.GREY,
    },
  },
});
