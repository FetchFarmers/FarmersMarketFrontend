import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <div className="footerTop">
        <div className="spacingContainer"></div>
        {/* <img src="/path/to/logo.png" alt="Logo" className="logoImage" /> */}
        <div className="spacingContainer"></div>
      </div>
      <div className="footerBottom">
        <div className="footerNavBarContainer">
          <ul className="menus">
            <li className="menuIcon"><a href="#">Home</a></li>
            <li className="menuIcon"><a href="#">About</a></li>
            <li className="menuIcon"><a href="#">Contact Us</a></li>
            <li className="menuIcon"><a href="#">FAQ</a></li>
          </ul>
        </div>
        <div className="copy">&copy; 2023 Fetch Farmers</div>
      </div>
    </footer>
  );
}

export default Footer;
