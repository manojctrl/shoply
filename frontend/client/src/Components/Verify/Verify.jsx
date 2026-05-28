import React from "react";
import "./Verify.css";
import { Button } from "@mui/material";
import { MdOutlineVerifiedUser } from "react-icons/md";

const Verify = () => {
  return (
    <div className="verify-container">
      <div className="verify-card">
        <div className="verify-icon">
          <MdOutlineVerifiedUser />
        </div>
        <h2>Verify Your Account</h2>
        <p>Please enter the 4-digit code sent to your email or phone.</p>

        <div className="otp-inputs">
          <input type="text" maxLength="1" />
          <input type="text" maxLength="1" />
          <input type="text" maxLength="1" />
          <input type="text" maxLength="1" />
        </div>

        <Button variant="contained" className="verify-btn" fullWidth>
          Verify Code
        </Button>

        <div className="resend">
          Didn’t receive the code? <span>Resend</span>
        </div>
      </div>
    </div>
  );
};

export default Verify;
