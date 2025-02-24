import React, { useState } from "react"; 
import { Link, useNavigate } from "react-router-dom"; 
import "../styles/Login.scss";
import Navbar from "../component/Navbar";
import { Eye, EyeOff } from "lucide-react";
import Footer from "../component/Footer";
import LangSelector from "../component/LangSelector";
import { useTranslation } from 'react-i18next';

function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate(); 

  const handleLogin = () => {
    navigate('/Profile'); 
  };

  return (
    <div>
      <Navbar />
      <div className="login-container">
        <div className="login-box">
          <h2>{t('Login_title')}</h2>

          {/* Email ou Téléphone */}
          <div className="input-group">
            <label>{t('first_input')}</label>
            <input
              type="text"
              required
            />
          </div>

          {/* Mot de passe */}
          <div className="input-group password-group">
            <label>{t('second_input')}</label>
            <input
              type={passwordVisible ? "text" : "password"}
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Lien d'inscription */}
          <p className="register-link">
            {t("register_link")} 
            <Link to="/register"> {t('register_link_main')}</Link>
          </p>

          {/* Bouton connexion */}
          <button className="login-btn" onClick={handleLogin}>
            {t('Login_btn')}
          </button>
        </div>
      </div>
      <LangSelector />
      <Footer />
    </div>
  );
}

export default Login;
