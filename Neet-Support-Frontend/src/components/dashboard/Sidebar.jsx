import { sidebarItems } from "@/data/dashBoardSidebar";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Sidebar() {
  const { pathname } = useLocation();
  const [expandedItem, setExpandedItem] = useState(null); 

  const handleItemClick = (id) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  return (
    <div className="custom-sidebar">
      {sidebarItems.map((elm, i) => (
        <div
          key={i}
          className={`custom-sidebar__item ${
            pathname === elm.href ? "-is-active" : ""
          }`}
        >
          <Link
            to={elm.href}
            onClick={() => handleItemClick(elm.id)}
            className="custom-sidebar__link d-flex items-center text-17 lh-1 fw-500"
          >
            <i className={`${elm.iconClass} mr-15`}></i>
            {elm.text}
            {elm.submenu && (
              <i
                className={`arrow-icon ${
                  expandedItem === elm.id
                    ? "fa fa-chevron-up"
                    : "fa fa-chevron-down"
                }`}
              ></i>
            )}
          </Link>
          {elm.submenu && expandedItem === elm.id && (
            <div className="custom-sidebar__submenu">
              {elm.submenu.map((subItem, j) => (
                <Link
                  key={j}
                  to={subItem.href}
                  className={`custom-sidebar__subitem ${
                    pathname === subItem.href ? "-is-active" : ""
                  }`}
                >
                  {subItem.text}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
