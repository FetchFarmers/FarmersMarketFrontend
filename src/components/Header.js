import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { menuItems } from "../menuItems";
import MenuItems from './MenuItems';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { faHouse } from '@fortawesome/free-solid-svg-icons'


const Header = () => {
   
    let navigate = useNavigate();
    // setCurrentUsername(window.localStorage.getItem("username"))
    // setToken(window.localStorage.getItem("token"))
    

    const handleSubmit = (event) => {
        event.preventDefault();
        window.localStorage.removeItem("token")
        window.localStorage.removeItem("username")
        // setCurrentUsername(window.localStorage.getItem("username"));
        navigate("/");
    }
    
  return (
    <div className="header">
        <div className="headerTop">      
              <nav className="headerUserControlsContainer">
                {/* <p className="userControlsWelcome">Welcome!</p> */}
                <Link className="userControlsLoginLink" to="/user/login">Log In</Link>
                <Link className="userControlsLoginLink" to="/user/register">Sign Up</Link>
            </nav>   
            <div className="headerAboutContainer">
                <img className="logoImage" src="../images/Farmer's market.png" alt=""/>
            </div>   
            <div className="spacingContainer" ></div>       
        </div>
        <div className="headerLinksContainer">
            <nav className="headerNavBarContainer">
              <Link  to="/"><FontAwesomeIcon className="menuIconLeft" icon={faHouse}/></Link>
              <ul className="menus">
                {menuItems.map((menu, index) => {
                  return <MenuItems items={menu} key={index} />;
                })}
              </ul>
              <Link  to="/my_cart"><FontAwesomeIcon className="menuIconRight" icon={faCartShopping}/></Link>
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
