//       main: "#673ab7"
//       main: "#9c27b0"
//       main: "#0077ED"

import { ThemeOptions, createTheme, responsiveFontSizes } from "@mui/material";

const themeOptions: ThemeOptions = {
  typography: {
    fontFamily: ["Segoe UI", "sans-serif"].join(","),
    button: {
      textTransform: "none",
    },
  },
  palette: {
    primary: { main: "#673ab7" },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
      },
    },
  },
};

let customDefaultTheme = createTheme(themeOptions);
customDefaultTheme = responsiveFontSizes(customDefaultTheme);

const darkTheme = createTheme({
  ...customDefaultTheme,
  palette: {
    mode: "dark",
  },
});

export { darkTheme, customDefaultTheme };
