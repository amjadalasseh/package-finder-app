import React from "react";
import "./Footer.scss";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <h2>About Us</h2>
          <p>
            We are committed to providing the best service. Follow us on social
            media to stay updated.
          </p>
        </div>
        <div className="footer-right">
          <nav className="footer-nav">
            <a href="#">Home</a>
            <a href="#">Services</a>
            <a href="#">Contact</a>
            <a href="#">About</a>
          </nav>
          <div className="social-icons">
            <a href="#" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
