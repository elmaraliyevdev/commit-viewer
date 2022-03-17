import React from "react";

function SidebarMenuItem({ name, icon }) {
  return (
    <div className="sidebar-menu-item">
      <img src={icon} alt={name} />
      {name}
    </div>
  );
}

export default SidebarMenuItem;
