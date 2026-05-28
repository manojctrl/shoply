import { Button } from "@mui/material";
import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import loginImg from '../../assets/images/login.png';
import { IoEyeOff } from "react-icons/io5";
import { FaRegEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDialog } from "../../ContextProvider/ContextProvider";
import API from "../../services/api";
import './Login.css';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [signUp, setSignUp] = useState(false);
  
  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();
  const { loginUser } = useDialog();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email || !password || (signUp && !name)) {
      setErrorMsg("Please fill in all fields");
      return;
    }

    try {
      if (signUp) {
        // Register User
        const { data } = await API.post("/auth/register", { name, email, password });
        loginUser(data);
        navigate("/");
      } else {
        // Login User
        const { data } = await API.post("/auth/login", { email, password });
        loginUser(data);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      setErrorMsg(error.response?.data?.message || "Authentication failed. Try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="form-container">
        <h2 className="login-header">
          {signUp ? "Create Account" : "Welcome Back"}
        </h2>
        <span>
          {signUp 
            ? "Please fill in your details to create an account" 
            : "Welcome back! Please enter your details"
          }
        </span>
        
        {errorMsg && <p className="error-message" style={{ color: "red", marginTop: "10px" }}>{errorMsg}</p>}
        
        <form onSubmit={handleSubmit}>
          {signUp && (
            <>
              <label>Name</label>
              <input 
                type="text" 
                placeholder="Enter your name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </>
          )}

          <label>Email</label>
          <input 
            type="email" 
            placeholder="Enter your email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          
          <label>Password</label>
          <div className="password-filed">
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className="eye-off-on" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaRegEye /> : <IoEyeOff />}
            </span>
          </div>
          
          <div className="remember-me">
            <div className="checkbox-sec">
              <input type="checkbox" />
              <span>Remember me</span>
            </div>
            <div className="forgot-section">
              <span>Forgot Password?</span>
            </div>
          </div>
          
          <div className="Button-section">
            <Button type="submit" className="sign-in-button" variant="contained">
              {signUp ? "Sign up" : "Sign in"}
            </Button>
            <Button type="button" variant="text" className="google-btns">
              <FaGoogle /> Sign in with Google
            </Button>
          </div>
          
          <p className="no-account">
            {signUp ? (
              <span>
                Already have an account?{" "}
                <span className="signup-link" onClick={() => setSignUp(false)}>
                  Sign in here!
                </span>
              </span>
            ) : (
              <span>
                Don't have an account?{" "}
                <span className="signup-link" onClick={() => setSignUp(true)}>
                  Sign up for free!
                </span>
              </span>
            )}
          </p>
        </form>
      </div>
      <div className="image-section">
        <img src={loginImg} alt="login-image" />
      </div>
    </div>
  );
};

export default Login;
