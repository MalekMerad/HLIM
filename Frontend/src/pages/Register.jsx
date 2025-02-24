import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import {useNavigate} from 'react-router-dom';
import LangSelector from "../component/LangSelector";
import "../styles/Register.scss";


function Register() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const navigate = useNavigate();


  return (
    <div>
      <Navbar />

      <div className="register-container">
        <div className="register-box">
          <h2>Create an Account</h2>

          {/* Nom d'utilisateur */}
          <div className="input-group">
            <label>User name</label>
            <input type="text" placeholder="Enter your username" required />
          </div>

          {/* Email */}
          <div className="input-group">
            <label>Email(Address)</label>
            <input type="email" placeholder="Enter your email " required />
          </div>

          {/* Mot de passe */}
          <div className="input-group password-group">
            <label>Password</label>
            <input 
              type={passwordVisible ? "text" : "password"} 
              placeholder="Enter your password" 
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

          {/* Confirmer le mot de passe */}
          <div className="input-group password-group">
            <label>Confirm password</label>
            <input 
              type={confirmPasswordVisible ? "text" : "password"} 
              placeholder="Confirm your password" 
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

          {/* Numéro téléphone */}
          <div className="input-group">
            <label>Phone number</label>
            <input type="tel" placeholder="Enter your phone number" required />
          </div>

          {/* Lien connexion */}
          <p className="login-link">
          Already have an account ? <Link to="/login">Login</Link>
          </p>

          {/* Bouton créer */}
          <button className="register-btn" onClick={()=>navigate('/ConfirmCode')}>Create</button>
        </div>
      </div>

      <LangSelector />
      <Footer />
    </div>
  );
}

export default Register;
