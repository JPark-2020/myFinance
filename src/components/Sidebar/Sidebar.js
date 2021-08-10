import React, { useState } from "react";

import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { SidebarItems } from "./SidebarItems";
import { IconContext } from "react-icons";
import * as AiIcons from "react-icons/ai";

import "./Sidebar.css";

const Sidebar = (props) => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => {
    setSidebar(!sidebar);
  };

  return (
    <div>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiOutlineClose onClick={showSidebar} />
              </Link>
            </li>
            {SidebarItems.map((item) => {
              return (
                <li key={item.key} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span className="itemTitle">{item.title}</span>
                  </Link>
                </li>
              );
            })}
            <li key="Logout" className="nav-text" onClick={props.logoutHandler}>
              <Link to="#">
                <AiIcons.AiOutlineLogout />
                <span className="itemTitle">Logout</span>
              </Link>
            </li>
          </ul>
        </nav>
      </IconContext.Provider>
    </div>
  );
};

export default Sidebar;
