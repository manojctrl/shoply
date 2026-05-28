import React, { useState, useRef, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import { GoChecklist } from "react-icons/go";
import { PiSignOutFill } from "react-icons/pi";
import "./Header.css";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState({
    name: "Manoj Katuwal",
    email: "katuwalmanoj67@gmail.com",
    role: "Admin",
  });

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="header-container">
      <div className="header-left">
        <h1>Overview</h1>
        <div className="period-selector">
          <button className="period-btn active">Monthly</button>
          <button className="period-btn">Quarterly</button>
          <button className="period-btn">Yearly</button>
        </div>
      </div>

      <div className="header-right">
        <div className="user-wrapper" ref={dropdownRef}>
          <button className="user-trigger" onClick={toggleDropdown}>
            <div className="user-avatar">{getInitials(user.name)}</div>
            <div className="user-details">
              <span className="user-name">{user.name}</span>
              <span className="user-email">{user.email}</span>
            </div>
            <div className={`dropdown-icon ${showDropdown ? "rotate" : ""}`}>
              ▼
            </div>
          </button>

          {showDropdown && (
            <div className="user-dropdown">
              <div className="dropdown-top">
                <div className="dropdown-avatar">{getInitials(user.name)}</div>
                <div className="dropdown-info">
                  <div className="dropdown-name">{user.name}</div>
                  <div className="dropdown-email">{user.email}</div>
                  <div className="dropdown-role">{user.role}</div>
                </div>
              </div>

              <div className="dropdown-separator"></div>

              <button className="dropdown-option">
                <CgProfile className="option-icon" />
                <span>Profile</span>
              </button>

              <button className="dropdown-option">
                <IoSettingsOutline className="option-icon" />
                <span>Account Setting</span>
              </button>

              <button className="dropdown-option">
                <GoChecklist className="option-icon" />
                <span>Activity Log</span>
              </button>

              <div className="dropdown-separator"></div>

              <button className="dropdown-option logout">
                <PiSignOutFill className="option-icon" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;