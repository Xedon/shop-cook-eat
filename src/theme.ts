import { createTheme, ThemeOptions } from "@mui/material/styles";

export const themeOptions: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#42424c",
    },
    secondary: {
      main: "#bdbdbd",
    },
    background: {
      default: "#303030",
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#EE0D0D",
        },
      },
    },
  },
};

export const theme = createTheme(themeOptions);
