import React from "react";

const Dropdown = ({ submenus, dropdown, onMouseEnter, onMouseLeave }) => {
  return (
    <ul
      className={`dropdown ${dropdown ? "show" : ""}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {submenus.map((submenu, index) => (
        <li key={index} className="menu-items">
          <a href={submenu.url}>{submenu.title}</a>
        </li>
      ))}
    </ul>
  );
};

export default Dropdown;
