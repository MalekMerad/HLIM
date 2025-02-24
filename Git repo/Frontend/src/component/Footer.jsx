import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import "../styles/Footer.scss";

function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="footer-container">
        {/* Left Section */}
        <div className="footer-about">
          <h2>Homora</h2>
          <p>Your trusted real estate platform for buying and selling properties effortlessly.</p>
        </div>

        {/* Middle Section - Quick Links */}
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Browse Listings</a></li>
            <li><a href="#">Sell Your Property</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>

        {/* Right Section - Social Media */}
        <div className="footer-social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaLinkedin /></a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Homora. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
