import React from "react";
import arrow from "../images/left.png";
import SidebarMenuItem from "./SidebarMenuItem";
import commits from "../images/commits.svg";
import dashboard from "../images/dashboard.svg";
import files from "../images/files.svg";
import issues from "../images/issues.svg";
import pullRequests from "../images/pull-requests.svg";
import codePatterns from "../images/code-patterns.svg";
import settings from "../images/settings.svg";

const menuItems = [
  {
    name: "Dashboard",
    icon: dashboard,
  },
  {
    name: "Commits",
    icon: commits,
  },
  {
    name: "Files",
    icon: files,
  },
  {
    name: "Issues",
    icon: issues,
  },
  {
    name: "Pull Requests",
    icon: pullRequests,
  },
];

function SidebarMenu() {
  return (
    <div className="sidebar-menu">
      <div className="back-button">
        <img src={arrow} alt="Arrow" />
        Team
      </div>
      {menuItems.map((menuItem, index) => {
        return (
          <SidebarMenuItem
            key={index}
            name={menuItem.name}
            icon={menuItem.icon}
          />
        );
      })}
      <div
        className="button"
        style={{ borderTop: "1px solid #d9e6e8", marginTop: "15px" }}
      >
        <img src={codePatterns} alt="Code Patterns" />
        Code Patterns
      </div>
      <div className="button">
        <img src={settings} alt="Settings" />
        Code Patterns
      </div>
    </div>
  );
}

export default SidebarMenu;
