import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { menuItems } from "../menuItems";
import MenuItems from './MenuItems';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { faHouse } from '@fortawesome/free-solid-svg-icons'


const Header = () => {
   
    let navigate = useNavigate();
    const username = window.localStorage.getItem("username")
    

    const handleLogout = (event) => {
        event.preventDefault();
        window.localStorage.removeItem("token")
        window.localStorage.removeItem("username")
        // setCurrentUsername(window.localStorage.getItem("username"));
        navigate("/");
    }
    
  return (
    <div className="header">
        <div className="headerTop">      
            <div className="spacingContainer" ></div>     
            <div className="headerAboutContainer">
                <img className="logoImage" src="../images/Farmer's market.png" alt=""/>
            </div>     
            <nav className="headerUserControlsContainer">
                {!username && <Link className="userControlsLoginLink" to="/user/login">Log In</Link>}
                {username && <button className="userControlsLoginLink" onClick={handleLogout} >Log Out</button>}
                {!username && <Link className="userControlsLoginLink" to="/user/register">Sign Up</Link>}
                {username && <Link className="userControlsLoginLink" to="/user/profile">My Profile</Link>}
                <Link className="userControlsLoginLink" to="/">Home&nbsp; <FontAwesomeIcon icon={faHouse}/></Link>
                <Link className="userControlsLoginLink" to="/my_cart">View&nbsp; <FontAwesomeIcon icon={faCartShopping}/></Link>
            </nav>   
        </div>
        <div className="headerLinksContainer">
            <nav className="headerNavBarContainer">
              <ul className="menus">
                {menuItems.map((menu, index) => {
                  return <MenuItems items={menu} key={index} />;
                })}
              </ul>
            </nav>
        </div>
            {/*  //todo wrap this nav this in if statement to display if user */}
            {/* <nav className="headerUserControlsContainer">
                
                <button className="userControlsLoginLinkScrollBar" onClick={handleSubmit} >Log Out</button>
            </nav> */}
        <div className="headerLinksContainer">     
              {/* //todo wrap this nav in if statement to display if user */}
      
        </div>
    </div>
  );
}
export default Header;
