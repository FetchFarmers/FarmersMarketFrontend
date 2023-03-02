import React from "react";
import { Link, useNavigate } from 'react-router-dom';


function Header() {
   
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
                <Link className="navBarLink" to="/">Home |</Link>
                <Link className="navBarLink" to="/products/meat_seafood">Meat & Seafood |</Link>
                <Link className="navBarLink" to="/products/dairy">Dairy |</Link>
                <Link className="navBarLink" to="/products/fruit_vegetables">Produce |</Link>
                <Link className="navBarLink" to="/products/bakery">Bakery</Link>
                
            </nav>
            {/*  //todo wrap this nav this in if statement to display if user */}
            {/* <nav className="headerUserControlsContainer">
                <p className="userControlsWelcome">Welcome User!</p>
                <button className="userControlsLoginLinkScrollBar" onClick={handleSubmit} >Log Out</button>
            </nav> */}
              {/* //todo wrap this nav in if statement to display if user */}
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