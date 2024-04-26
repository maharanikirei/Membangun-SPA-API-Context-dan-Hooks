import React, { useContext } from "react";
import LocaleContext from "../../contexts/LocaleContext";
import { SiGoogletranslate } from "react-icons/si";
import PropTypes from "prop-types";

const ToggleLang = ({ size = 20 }) => {
  const { changeLocale } = useContext(LocaleContext);

  const handleToggle = () => {
    changeLocale();
  };

  return (
    <button onClick={handleToggle}>
      <SiGoogletranslate size={size} />
    </button>
  );
};

ToggleLang.propTypes = {
  size: PropTypes.number,
};

export default ToggleLang;
