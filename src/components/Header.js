import React, { useState } from 'react';
import { Link, useNavigate, Routes, Route } from 'react-router-dom';
import { menuItems } from "../menuItems";
import MenuItems from './MenuItems';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import SearchBar from './products_components/SearchBar';

const Header = ({ cartItemTotal, setCartItemTotal }) => {

  let navigate = useNavigate();
  const username = window.localStorage.getItem("username")
  const isAdmin = JSON.parse(window.localStorage.getItem("isAdmin"))

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem("token")
    window.localStorage.removeItem("username")
    window.localStorage.removeItem("isAdmin")
    window.localStorage.removeItem("fetchSessionId")
    window.localStorage.removeItem("cartTotal")
    setCartItemTotal(0)
    navigate("/");
  }

  return (
    <div className="header">
      <div className="headerTop">
        <div className="spacingContainer" ></div>
        <div className="headerAboutContainer">
          <img className="ourLogoImage" src="../images/Farmer's market.png" alt="" />
        </div>
        <nav className="headerUserControlsContainer">
          {!username && <Link className="userControlsLoginLink" to="/user/login">Log In</Link>}
          {username && <button className="userControlsLoginLink" onClick={handleLogout} >Log Out</button>}
          {!username && <Link className="userControlsLoginLink" to="/user/register">Sign Up</Link>}
          {username && <Link className="userControlsLoginLink" to="/user/profile">My Profile</Link>}
          <Link className="userControlsLoginLink" to="/">Home&nbsp; <FontAwesomeIcon icon={faHouse} /></Link>
          <Link className="userControlsLoginLink" to="/my_cart">View&nbsp;<FontAwesomeIcon icon={faCartShopping} />
            {cartItemTotal !== 0 && <p>({cartItemTotal})</p>}
          </Link>
          {isAdmin && <Link className="userControlsLoginLink" to="/admin">Admin</Link>}
        </nav>
      </div>
      <div className="headerLinksContainer">
        <nav className="headerNavBarContainer">
          <ul className="menus">
            {menuItems.map((menu, index) => {
              return <MenuItems items={menu} key={index} />
            })}
          </ul>
          <div className='searchbar'>
                <SearchBar />
              </div>
        </nav>
      </div>
    </div>
  );
}

export default Header;
