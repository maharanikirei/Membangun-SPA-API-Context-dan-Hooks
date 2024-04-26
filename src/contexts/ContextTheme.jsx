import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

const ContextTheme = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "dark"
  );

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const contextValue = {
    theme,
    toggleTheme,
  };

  return (
    <ContextTheme.Provider value={contextValue}>
      {children}
    </ContextTheme.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContextTheme;
