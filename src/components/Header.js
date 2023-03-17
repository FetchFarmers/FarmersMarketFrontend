import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { menuItems } from "../menuItems";
import MenuItems from './MenuItems';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import SearchBar from './products_components/SearchBar';
import { slide as Menu } from 'react-burger-menu';

const Header = ({ cartItemTotal, setCartItemTotal }) => {

  const [isMenuOpen, setMenuOpen] = useState(false);

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

  const desktopHeader = (
    <div className="header">
      <div className="headerTop">
        <div className="spacingContainer"></div>
        <div className="headerAboutContainer">
          <img className="ourLogoImage" src="../images/Farmer's market.png" alt="" />
        </div>
        <div className="headerUserControlsContainer">
          {!username && <Link className="userControlsLoginLink" to="/user/login">Log In</Link>}
          {username && <button className="userControlsLoginLink" onClick={handleLogout} >Log Out</button>}
          {!username && <Link className="userControlsLoginLink" to="/user/register">Sign Up</Link>}
          {username && <Link className="userControlsLoginLink" to="/user/profile">My Profile</Link>}
          <Link className="userControlsLoginLink" to="/">Home&nbsp; <FontAwesomeIcon icon={faHouse} /></Link>
          <Link className="userControlsLoginLink" to="/my_cart">View&nbsp;<FontAwesomeIcon icon={faCartShopping} />
            {cartItemTotal !== 0 && <p>({cartItemTotal})</p>}
          </Link>
          {isAdmin && <Link className="userControlsLoginLink" to="/admin">Admin</Link>}
        </div>
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
  
  const mobileHeader = (
    <div className="header">
      <div className="headerTop">
        <div className="spacingContainer"></div>
        <div className="headerAboutContainer">
          <img className="ourLogoImage" src="../images/Farmer's market.png" alt="" />
        </div>
        <div className="headerUserControlsContainer">
          <button className="headerMenuButton" onClick={() => setMenuOpen(!isMenuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
      <nav className="headerNavBarContainer hamburger-menu">
        <Menu right isOpen={isMenuOpen} onClose={() => setMenuOpen(false)}>
          <div className="headerUserControlsContainer hamburger-menu">
            {!username && <Link className="userControlsLoginLink" to="/user/login" onClick={() => setMenuOpen(false)}>Log In</Link>}
            {username && <button className="userControlsLoginLink" onClick={handleLogout}>Log Out</button>}
            {!username && <Link className="userControlsLoginLink" to="/user/register" onClick={() => setMenuOpen(false)}>Sign Up</Link>}
            {username && <Link className="userControlsLoginLink" to="/user/profile" onClick={() => setMenuOpen(false)}>My Profile</Link>}
            <Link className="userControlsLoginLink" to="/" onClick={() => setMenuOpen(false)}>Home&nbsp; <FontAwesomeIcon icon={faHouse} /></Link>
            <Link className="userControlsLoginLink" to="/my_cart" onClick={() => setMenuOpen(false)}>View&nbsp;<FontAwesomeIcon icon={faCartShopping} />
              {cartItemTotal !== 0 && <p>({cartItemTotal})</p>}
            </Link>
            {isAdmin && <Link className="userControlsLoginLink" to="/admin" onClick={() => setMenuOpen(false)}>Admin</Link>}
            {menuItems.map((menu, index) => {
              return <MenuItems items={menu} key={index} onClick={() => setMenuOpen(false)} />
            })}
          </div>
          </Menu>
          <div className='searchbar'>
            <SearchBar />
          </div>
      </nav>
    </div>
  );

  return window.innerWidth >= 768 ? desktopHeader : mobileHeader;
};

export default Header;