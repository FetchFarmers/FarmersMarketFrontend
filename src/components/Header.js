import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { menuItems } from "../menuItems";
import MenuItems from './MenuItems';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import SearchBar from './products_components/SearchBar';
import { useMediaQuery } from '@material-ui/core';

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

  const isMobile = useMediaQuery('(max-width:600px)');
  const [showMenu, setShowMenu] = useState(false);

  const handleToggleMenu = () => {
    setShowMenu(!showMenu);
  }
    return (
      <div className="header">
        
        <div className="headerTop">
          <div className="spacingContainer"></div>
          <div className="headerAboutContainer">
            <img className="ourLogoImage" src="../images/Farmer's market.png" alt="" />
            <div className='searchbar'>
                <SearchBar />
              </div>
          </div>
          {isMobile && (
            <div className="headerUserControlsContainer">
              <div className="hamburgerMenu" onClick={handleToggleMenu}>
                <div className="hamburgerLine" />
                <div className="hamburgerLine" />
                <div className="hamburgerLine" />
              </div>
              {showMenu && (
                <nav className="mobileUserControls">
                  <div className= 'user-links'>
                  {!username && <Link className="userControlsLoginLink" to="/user/login" onClick={handleToggleMenu}>Log In</Link>}
                  {username && <button className="userControlsLoginLink" onClick={handleLogout}>Log Out</button>}
                  {!username && <Link className="userControlsLoginLink" to="/user/register" onClick={handleToggleMenu}>Sign Up</Link>}
                  {username && <Link className="userControlsLoginLink" to="/user/profile" onClick={handleToggleMenu}>My Profile</Link>}
                  <Link className="userControlsLoginLink" to="/" onClick={handleToggleMenu}>Home&nbsp; <FontAwesomeIcon icon={faHouse} /></Link>
                  <Link className="userControlsLoginLink" to="/my_cart" onClick={handleToggleMenu}>View&nbsp;<FontAwesomeIcon icon={faCartShopping} />
                    {cartItemTotal !== 0 && <p>({cartItemTotal})</p>}
                  </Link>
                  {isAdmin && <Link className="userControlsLoginLink" to="/admin" onClick={handleToggleMenu}>Admin</Link>}
                  </div>
                  {/* <ul className="menus"> */}
                    {menuItems.map((menu, index) => {
                      return <MenuItems items={menu} key={index} />
                    })}
                  {/* </ul> */}                  
                </nav>
              )}
            </div>
          )}
          {!isMobile && (
            <nav className="headerUserControlsContainer">
              {!username && <Link className="userControlsLoginLink" to="/user/login">Log In</Link>}
              {username && <button className="userControlsLoginLink" onClick={handleLogout}>Log Out</button>}
              {!username && <Link className="userControlsLoginLink" to="/user/register">Sign Up</Link>}
              {username && <Link className="userControlsLoginLink" to="/user/profile">My Profile</Link>}
              <Link className="userControlsLoginLink" to="/">Home&nbsp; <FontAwesomeIcon icon={faHouse} /></Link>
              <Link className="userControlsLoginLink" to="/my_cart">
                View&nbsp;<FontAwesomeIcon icon={faCartShopping} />
                {cartItemTotal !== 0 && <p>({cartItemTotal})</p>}
              </Link>
              {isAdmin && <Link className="userControlsLoginLink" to="/admin">Admin</Link>}
            </nav>
          )}
        </div>
        {!isMobile && (
          <div className="headerLinksContainer">
            <nav className="headerNavBarContainer">
              <ul className="menus">
                {menuItems.map((menu, index) => {
                  return <MenuItems items={menu} key={index} />
                })}
              </ul>
            </nav>
          </div>
        )}
      </div>
    );
}
export default Header;




