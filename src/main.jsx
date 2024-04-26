import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./contexts/ContextTheme";
import { CustomLocaleProvider } from "./contexts/LocaleContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ThemeProvider value={localStorage.getItem("theme") || "light"}>
      <CustomLocaleProvider value={localStorage.getItem("locale") || "id"}>
        <App />
      </CustomLocaleProvider>
    </ThemeProvider>
  </BrowserRouter>
);
