import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHidden(window.pageYOffset > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <footer className={`footer ${hidden ? 'hidden' : ''}`}>
      <div className="footerTop">
        <div className="spacingContainer"></div>
        <div className="spacingContainer"></div>
      </div>
      <div className="footerNavBarContainer">
        <ul className="footer-menus">
          <li>
            <Link className="menuIcon" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="menuIcon" to="/about">
              About
            </Link>
          </li>
          <li>
            <Link className="menuIcon" to="/contact">
              Contact Us
            </Link>
          </li>
          <li>
            <Link className="menuIcon" to="/faq">
              FAQ
            </Link>
          </li>
        </ul>
      </div>
      <div className="copy">&copy; 2023 Fetch Farmers</div>
    </footer>
  );
}

export default Footer;
