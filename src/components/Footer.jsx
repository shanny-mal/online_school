import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer-text">
          &copy; {new Date().getFullYear()} ShannyTechSolutions. All rights
          reserved. Developed with ❤️ by ShannyTechSolutions.
        </p>
        <div className="footer-social">
          <a href="#" className="footer-link" aria-label="Facebook">
            <FaFacebookF />
          </a>
          <a href="#" className="footer-link" aria-label="Twitter">
            <FaTwitter />
          </a>
          <a href="#" className="footer-link" aria-label="Instagram">
            <FaInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
