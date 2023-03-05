import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { menuItems } from '../menuItems';
import MenuItems from './MenuItems';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { fetchUserData } from '../user_api';

const Header = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [token, setToken] = useState(window.localStorage.getItem('token'));

  let navigate = useNavigate();

  const handleLogout = () => {
    window.localStorage.removeItem('token');
    setToken(null);
    navigate('/');
  };

  useEffect(() => {
    const getUserData = async () => {
      if (token) {
        const userData = await fetchUserData(token);
        setIsAdmin(userData.isAdmin);
      }
    };
    getUserData();
  }, [token]);

  return (
    <div className="header">
      <div className="headerTop">
        <nav className="headerUserControlsContainer"></nav>
        <div className="headerAboutContainer">
          <img className="logoImage" src="../images/Farmer's market.png" alt="" />
        </div>
        <div className="spacingContainer"></div>
      </div>
      <div className="headerLinksContainer">
        <nav className="headerNavBarContainer">
          <Link to="/">
            <FontAwesomeIcon className="menuIconLeft" icon={faHouse} />
          </Link>
          {isAdmin && <Link to="/admin">Admin</Link>}
          <ul className="menus">
            {menuItems.map((menu, index) => {
              return <MenuItems items={menu} key={index} />;
            })}
          </ul>
          {token ? (
            <button className="userControlsLoginLink" onClick={handleLogout}>
              Log Out
            </button>
          ) : (
            <Link className="userControlsLoginLink" to="/user/login">
              Log In
            </Link>
          )}
          <Link to="/my_cart">
            <FontAwesomeIcon className="menuIcon" icon={faCartShopping} />
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Header;
