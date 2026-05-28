import React from "react";
import { TextField, Button } from "@mui/material";
import { RiLockPasswordLine } from "react-icons/ri";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  return (
    <div className="forgot-container">
      <div className="forgot-card">
        <div className="forgot-icon">
          <RiLockPasswordLine />
        </div>

        <h2>Reset Password</h2>
        <p>Please enter your new password below.</p>

        <TextField
          label="New Password"
          type="password"
          fullWidth
          margin="normal"
          variant="standard"
        />

        <TextField
          label="Confirm Password"
          type="password"
          fullWidth
          margin="normal"
          variant="standard"
        />

        <Button
          variant="contained"
          fullWidth
          className="forgot-btn"
          sx={{
            mt: 2,
            backgroundColor: "#185a9d",
            borderRadius: "10px",
            textTransform: "none",
            fontWeight: "600",
            fontSize: "16px",
            height: "45px",
            "&:hover": { backgroundColor: "#12477c" },
          }}
        >
          Update Password
        </Button>
      </div>
    </div>
  );
};

export default ForgotPassword;
