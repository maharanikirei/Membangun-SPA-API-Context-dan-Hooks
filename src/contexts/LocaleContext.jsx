import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

const LocaleContext = createContext();

export const CustomLocaleProvider = ({ children }) => {
  const [locale, setLocale] = useState(
    () => localStorage.getItem("locale") || "id"
  );

  const changeLocale = () => {
    const newLocale = locale === "id" ? "en" : "id";
    setLocale(newLocale);
    localStorage.setItem("locale", newLocale);
  };

  const contextValue = {
    locale,
    changeLocale,
  };

  return (
    <LocaleContext.Provider value={contextValue}>
      {children}
    </LocaleContext.Provider>
  );
};

CustomLocaleProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LocaleContext;
