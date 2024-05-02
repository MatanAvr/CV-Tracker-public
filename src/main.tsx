import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import { ThemeProvider } from "@mui/material/styles";
import { customDefaultTheme } from "./Theme/Theme.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={customDefaultTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
