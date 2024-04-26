import React from "react";
import PropTypes from "prop-types";

const ActionButton = ({ children, onClick, style, ...props }) => {
  const handleClick = (event) => {
    if (onClick) {
      onClick(event);
    }
  };

  const Stylesbutton = {
    save: {
      base: "bg-green-500 hover:bg-green-600 text-white",
      size: "px-4 py-3 text-sm",
    },
    archive: {
      base: "bg-pink-500 hover:bg-pink-600 text-white",
      size: "px-4 py-3 text-sm",
    },
    unarchive: {
      base: "bg-pink-500 hover:bg-pink-600 text-white",
      size: "px-4 py-3 text-sm",
    },
    delete: {
      base: "bg-red-500 hover:bg-red-600 text-white",
      size: "px-4 py-3 text-sm",
    },
    default: {
      base: "bg-dark hover:bg-primary text-light",
      size: "px-4 py-2 text-sm",
    },
  };

  const getButtonStyle = () => {
    const selectedStyle = Stylesbutton[style] || Stylesbutton.default;
    return selectedStyle.base;
  };

  const getButtonSize = () => {
    const selectedStyle = Stylesbutton[style] || Stylesbutton.default;
    return selectedStyle.size;
  };

  return (
    <button
      onClick={handleClick}
      className={`rounded-lg transition ease-in-out duration-150 ${getButtonStyle()} ${getButtonSize()}`}
      {...props}
    >
      {children}
    </button>
  );
};

ActionButton.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  style: PropTypes.oneOf(["save", "edit", "archive", "unarchive", "delete"]),
};

export default ActionButton;
