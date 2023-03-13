import React, { useState, useRef, useEffect } from "react";
import Dropdown from './Dropdown';
import { Link } from 'react-router-dom';

const MenuItems = ({ items }) => {
  const [dropdown, setDropdown] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setDropdown(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setDropdown(false);
    }, 10);
  };

  return (
    <li className="menu-items"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
    >
      {items.submenu && items.url ? (
        <>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={dropdown ? "true" : "false"}
          >
            <Link to={items.url}>{items.title}</Link>{" "}
          </button>
          <Dropdown
            submenus={items.submenu}
            dropdown={dropdown}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        </>
      ) : (
        <Link to={items.url}>{items.title}</Link>
      )}
    </li>
  );
};

export default MenuItems;