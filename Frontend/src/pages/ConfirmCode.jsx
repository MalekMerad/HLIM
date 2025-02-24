import React, { useState, useEffect } from 'react';
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import LangSelector from "../component/LangSelector";
import "../styles/ConfirmCode.scss";

function ConfirmCode() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [resendDisabled, setResendDisabled] = useState(true);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setResendDisabled(false);
    }
  }, [timeLeft]);

  const handleInputChange = (index, value) => {
    if (value.length > 1) return; // Un seul nbr par case
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      document.getElementById(`code-${index + 1}`).focus();
    }
  };

  return (
    <div>
      <Navbar />
      <div className="confirm-container">
        <div className="confirm-box">
          <h2>Enter Confirmation Code</h2>
          <p>Please enter the 6-digit code sent to your email.</p>

          <div className="code-inputs">
            {code.map((digit, index) => (
              <input
                key={index}
                id={`code-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value)}
              />
            ))}
          </div>

          <p className="resend-text">
            {resendDisabled ? `Resend code in ${timeLeft}s` : ""}
          </p>

          <button
            className="resend-btn"
            onClick={() => {
              setTimeLeft(30);
              setResendDisabled(true);
            }}
            disabled={resendDisabled}
          > Resend Code
          </button>
        </div>
      </div>

      <LangSelector />
      <Footer />
    </div>
  );
}

export default ConfirmCode;