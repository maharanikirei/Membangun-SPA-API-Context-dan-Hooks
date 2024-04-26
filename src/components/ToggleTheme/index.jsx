import React, { useContext } from "react";
import ContextTheme from "../../contexts/ContextTheme";
import { FaMoon, FaSun } from "react-icons/fa";
import PropTypes from "prop-types";

const ToggleTheme = ({ moonSize = 20, sunSize = 20 }) => {
  const { theme, toggleTheme } = useContext(ContextTheme);

  const handleToggle = () => {
    toggleTheme();
  };

  return (
    <button onClick={handleToggle}>
      {theme === "dark" ? (
        <FaMoon size={moonSize} className="text-gray-100" />
      ) : (
        <FaSun size={sunSize} />
      )}
    </button>
  );
};

ToggleTheme.propTypes = {
  moonSize: PropTypes.number,
  sunSize: PropTypes.number,
};

export default ToggleTheme;
