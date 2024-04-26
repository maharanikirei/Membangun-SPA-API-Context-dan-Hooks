import React, { useState } from "react";
import PropTypes from "prop-types";
import Sidebar from "../Sidebar";

const SidebarToggleIcon = ({ isSidebarVisible, toggleSidebar }) => (
  <button
    type="button"
    className="md:hidden focus:outline-none mx-4"
    onClick={toggleSidebar}
  >
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      {isSidebarVisible ? (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        />
      ) : (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 6h16M4 12h16m-7 6h7"
        />
      )}
    </svg>
  </button>
);

SidebarToggleIcon.propTypes = {
  isSidebarVisible: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};

const MobileSidebar = ({ isSidebarVisible }) => (
  <aside
    className={`md:hidden w-64 px-4 h-screen absolute top-6 left-0 ${
      isSidebarVisible ? "block" : "hidden"
    }`}
  >
    <Sidebar />
  </aside>
);

MobileSidebar.propTypes = {
  isSidebarVisible: PropTypes.bool.isRequired,
};

const MobileSidebarButton = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div style={{ position: "relative" }}>
      <SidebarToggleIcon
        isSidebarVisible={isSidebarVisible}
        toggleSidebar={toggleSidebar}
      />
      <MobileSidebar isSidebarVisible={isSidebarVisible} />
    </div>
  );
};

export default MobileSidebarButton;
