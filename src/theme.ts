import { createTheme, ThemeOptions } from "@mui/material/styles";

export const themeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#42424c",
    },
    secondary: {
      main: "#bdbdbd",
    },
    background: {
      default: "#fafafa",
    },
  },
};

export const theme = createTheme(themeOptions);
