import React from 'react';
import "../styles/Navbar.scss";
import HomoraLogo from '../assets/images/Homora-image.png';
import {useNavigate} from 'react-router-dom';
import { Link } from "react-scroll";
import { useTranslation } from 'react-i18next';
function Navbar() {

  const navigate = useNavigate();
  const {t} = useTranslation();
  return (
    <nav className='navbar-container'>
      <div className='logo-section'>
        <span className='logo-text'>Homora</span>
      </div>
      <div className='nav-links'>
        <Link to="Home" className='nav-link' smooth={true} duration={500}>{t("Home_link")}</Link>
        <Link to="about" className='nav-link' smooth={true} duration={500}>{t("Contact_link")}</Link>
        <Link to="contact" className='nav-link' smooth={true} duration={500}>{t("Follow_link")}</Link>
      </div>
      <div className='btn-container'>
        <button className='btn btn-login' onClick={()=>navigate('/login')}>{t("login_button")}</button>
        <button className='btn btn-register' onClick={()=>navigate('/register')}>{t("register_button")}</button>
      </div>
    </nav>
  );
}

export default Navbar;
