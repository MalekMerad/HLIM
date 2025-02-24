import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Eye, EyeOff, Upload } from "lucide-react";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import { useNavigate } from 'react-router-dom';
import LangSelector from "../component/LangSelector";
import "../styles/Register.scss";
import { useTranslation } from 'react-i18next';

function Register() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Handle profile picture upload
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="register-container">
        <div className="register-box">
          <h2>{t("register_title")}</h2>
          
          <div className="profile-pic-container">
            <label className="profile-pic-label">{t("profile_picture")}</label>
            <div className="profile-pic-box">
              {profilePic ? (
                <img src={profilePic} alt="Profile Preview" className="profile-pic-preview" />
              ) : (
                <Upload size={40} className="upload-icon" />
              )}
              <input type="file" accept="image/*" onChange={handleProfilePicChange} />
            </div>
          </div>

          {/* Username */}
          <div className="input-group">
            <label>{t("username_label")}</label>
            <input type="text" placeholder={t("username_placeholder")} required />
          </div>

          {/* Email */}
          <div className="input-group">
            <label>{t("email_label")}</label>
            <input type="email" placeholder={t("email_placeholder")} required />
          </div>

          <div className="input-group password-group">
            <label>{t("password_label")}</label>
            <input 
              type={passwordVisible ? "text" : "password"} 
              placeholder={t("password_placeholder")} 
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

          <div className="input-group password-group">
            <label>{t("confirm_password_label")}</label>
            <input 
              type={confirmPasswordVisible ? "text" : "password"} 
              placeholder={t("confirm_password_placeholder")} 
              required 
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
            >
              {confirmPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="input-group">
            <label>{t("phone_label")}</label>
            <input type="tel" placeholder={t("phone_placeholder")} required />
          </div>

          <p className="login-link">
            {t("already_account")} <Link to="/login">{t("login")}</Link>
          </p>

          <button className="register-btn" onClick={() => navigate('/ConfirmCode')}>
            {t("create_button")}
          </button>
        </div>
      </div>

      <LangSelector />
      <Footer />
    </div>
  );
}

export default Register;
