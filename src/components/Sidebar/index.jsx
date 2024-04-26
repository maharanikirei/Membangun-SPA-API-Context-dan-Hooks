import React, { useState, useEffect, useContext } from "react";
import { IoHome, IoArchive, IoAddCircle } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import LinkPages from "../LinkPages";
import PropTypes from "prop-types";
import ContextTheme from "../../contexts/ContextTheme";
import LocaleContext from "../../contexts/LocaleContext";

const menuData = [
  {
    labelId: "Catatan Aktif",
    labelEn: "Active Note",
    path: "/",
    icon: <IoHome />,
  },
  {
    labelId: "Arsip",
    labelEn: "Archive",
    path: "/archive",
    icon: <IoArchive />,
  },
  {
    labelId: "Tambah",
    labelEn: "New",
    path: "/add",
    icon: <IoAddCircle />,
  },
];

const Sidebar = () => {
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState("Home");
  const { theme } = useContext(ContextTheme);
  const { locale } = useContext(LocaleContext);

  useEffect(() => {
    const path = location.pathname;

    const foundMenu = menuData.find((menu) => menu.path === path);
    if (foundMenu) {
      setActiveMenu(foundMenu.labelId);
    } else {
      setActiveMenu("");
    }
  }, [location.pathname]);

  const handleMenuClick = (menuLabel) => {
    setActiveMenu(menuLabel);
  };

  return (
    <div className="md:h-3/4 pt-4">
      <div
        className={`w-48 border rounded-lg h-full px-2 py-4 ${
          theme === "light" ? "bg-slate-100" : "bg-slate-800"
        } h-[210px]`}
      >
        {menuData.map((menu, index) => (
          <LinkPages
            key={index}
            icon={menu.labelId === "Catatan Aktif" ? <IoHome /> : menu.icon}
            label={locale === "id" ? menu.labelId : menu.labelEn}
            path={menu.path}
            active={activeMenu === menu.labelId}
            onClick={() => handleMenuClick(menu.labelId)}
          />
        ))}
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  onMenuClick: PropTypes.func,
  activeMenu: PropTypes.string,
};

export default Sidebar;
