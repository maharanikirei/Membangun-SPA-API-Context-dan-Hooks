import React, { useContext } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import ToggleTheme from "../ToggleTheme";
import { RiLogoutBoxRLine, RiAccountCircleFill } from "react-icons/ri";
import MobileSidebarButton from "../MobileSidebarButton";
import ToggleLang from "../ToggleLang";
import LocaleContext from "../../contexts/LocaleContext";
import ContextTheme from "../../contexts/ContextTheme";

function Navigation({ logout, name }) {
  const { locale } = useContext(LocaleContext);
  const { theme } = useContext(ContextTheme);

  const renderAppName = () => {
    return (
      <span
        className={`hidden md:block text-4xl font-bold ${
          theme === "light" ? "text-black-600" : "text-white"
        }`}
      >
        {locale === "id" ? "Aplikasi Catatan" : "Notes App"}
      </span>
    );
  };

  const renderLogoutButton = () => {
    return (
      <button
        onClick={logout}
        className={`flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors duration-300 ${
          theme === "dark" ? "text-white" : ""
        }`}
      >
        <RiLogoutBoxRLine size={20} />
        <span className="hidden md:block">
          {locale === "id" ? "Keluar" : "Logout"}
        </span>
      </button>
    );
  };

  return (
    <nav
      className={`container mx-auto flex justify-between items-center px-4 py-4 shadow-lg ${
        theme === "light" ? "bg-gray-100" : "bg-gray-800"
      }`}
      style={{ borderRadius: "10px" }}
    >
      <div className="flex items-center gap-4 md:gap-0">
        <MobileSidebarButton />
        <Link to="/" className="text-4xl font-bold flex items-center gap-2">
          {renderAppName()}
        </Link>
      </div>
      <div className="flex items-center gap-6">
        <ToggleLang />
        <ToggleTheme />
        <Link
          to="/"
          className={`flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors duration-300 ${
            theme === "dark" ? "text-white" : ""
          }`}
        >
          <RiAccountCircleFill size={20} />
          {name}
        </Link>
        {renderLogoutButton()}
      </div>
    </nav>
  );
}

Navigation.propTypes = {
  logout: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default Navigation;
