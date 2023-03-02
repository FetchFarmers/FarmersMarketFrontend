import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { menuItems } from "../menuItems";
import MenuItems from './MenuItems';

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
            <div className="headerAboutContainer">
                <h1 className="aboutTitle">Farmers Market</h1>
                <h5 className="aboutSlogan"> Where you will always find the best local products! </h5>
            </div>        
        </div>
        <div className="headerLinksContainer">
            <nav className="headerNavBarContainer">
              <ul className="menus">
                {menuItems.map((menu, index) => {
                  return <MenuItems items={menu} key={index} />;
                })}
              </ul>
            </nav>
            <nav className="headerUserControlsContainer">
                <p className="userControlsWelcome">Welcome! </p>
                <Link className="userControlsLoginLinkLeft" to="/user/login">Log In</Link>
                <Link className="userControlsLoginLinkRight" to="/user/register">Register</Link>
                <Link className="userControlsLoginLinkRight" to="/my_cart">Cart</Link>
            </nav>                   
        </div>
    </div>
  );
}
export default Header;
