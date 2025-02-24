import React from 'react';
import "../styles/Navbar.scss";
import HomoraLogo from '../assets/images/Homora-image.png';
import ProfileImage from '../assets/images/profileImage.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import {useNavigate} from 'react-router-dom';
import { useState } from 'react';
import { Link } from "react-scroll";
import { useTranslation } from 'react-i18next';
function Navbar() {

  const navigate = useNavigate();
  const {t} = useTranslation();

  const [registred, setIsRegistred] = useState(false);

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

    {!registred &&(
         <div className='btn-container'>
         <button className='btn btn-login' onClick={()=>navigate('/login')}>{t("login_button")}</button>
         <button className='btn btn-register' onClick={()=>navigate('/register')}>{t("register_button")}</button>
       </div>
    )}

    { registred &&(
         <div className='registred-container'>
          <div className='profileImg-container'>
              <img src={ProfileImage} alt =  'profile'/>
          </div>
          <div className='creat-container' onClick={() => navigate('/Create')}>
            <FontAwesomeIcon icon={faPlus} />
          </div>
       </div>
    )}
     
    </nav>
  );
}

export default Navbar;
