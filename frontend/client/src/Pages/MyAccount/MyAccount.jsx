import React, { useState } from "react";
import { FaUserCircle, FaHeart, FaShoppingBag } from "react-icons/fa";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { FaCloudUploadAlt } from "react-icons/fa";
import manoj from "../../assets/images/manoj.jpg";
import Button from "@mui/material/Button";

import "./MyAccount.css";
import { NavLink } from "react-router-dom";

function MyAccount() {
  const [activeTab, setActiveTab] = useState("profile");

  // const handleTabClick = (tab) => {
  //   setActiveTab(tab);
  // };

  return (
    <div className="my-account-container">
      <aside className="my-account-sidebar">
        <div className="my-account-sidebar-header">
          <div className="my-account-user-icon">
            <label htmlFor="upload-input" className="profile-upload">
              <img src={manoj} alt="Profile" className="profile-pic" />
              <FaCloudUploadAlt className="upload-icon" />
            </label>
            <input
              id="upload-input"
              type="file"
              accept="image/*"
              // onChange={handleImageChange}
              // style={{ display: "none" }}
            />
          </div>
          <h2>Welcome, Manoj</h2>
        </div>
        <nav className="my-account-nav-menu">
          <ul>
            <NavLink to='/profile' style={{textDecoration: 'none', color: 'inherit'}} className="sidebar-link">

            <li>
              <FaUserCircle /> Profile
            </li>
            </NavLink >
            <NavLink to='/my-list' style={{textDecoration: 'none', color: 'inherit'}} className="sidebar-link">

            <li>
              <FaHeart /> My List
            </li>
            </NavLink>
            <NavLink to='/my-order' style={{textDecoration: 'none', color: 'inherit'}} className="sidebar-link">
            <li>
              <FaShoppingBag /> My Orders
            </li>
            </NavLink>
            <NavLink to='/' style={{textDecoration: 'none', color: 'inherit'}} className="sidebar-link">

            <li>
              <RiLogoutBoxRLine /> Log Out
            </li>
            </NavLink>
          </ul>
        </nav>
      </aside>

      <main className="my-account-main-content">
        {/* <div className="my-account-tabs">
          <button
            className={`my-account-tab ${
              activeTab === "profile" ? "active" : ""
            }`}
            onClick={() => handleTabClick("profile")}
          >
            1. Profile
          </button>
          <button
            className={`my-account-tab ${
              activeTab === "password" ? "active" : ""
            }`}
            onClick={() => handleTabClick("password")}
          >
            2. Password
          </button>
        </div> */}

        {/* Profile Section */}
        <section
          className={`my-account-tab-content ${
            activeTab === "profile" ? "active" : ""
          }`}
        >
          <h1>Your personal profile info</h1>

          <form className="my-account-form">
            <div className="my-account-form-row">
              <div className="my-account-form-group">
                <label>First name</label>
                <input type="text" value="None" required />
              </div>
              <div className="my-account-form-group">
                <label>Last name</label>
                <input type="text" value="None" required />
              </div>
            </div>

            <div className="my-account-form-group">
              <label>Username (not your e-mail)</label>
              <input type="text" value="Username" required />
            </div>

            <div className="my-account-form-group">
              <label>Your e-mail</label>
              <input type="email" value="mail@example.com" required />
            </div>

            <div className="my-account-form-row">
              <div className="my-account-form-group">
                <label>Personal phone number</label>
                <input type="tel" value="+977 9800000000" required />
              </div>
              <div className="my-account-form-group">
                <label>Work phone number</label>
                <input type="tel" value="+977 9800000001" required />
              </div>
            </div>

            <div className="my-account-form-row">
              <div className="my-account-form-group">
                <label>Country, City</label>
                <input type="text" value="Nepal, Itahari" required />
              </div>
              <div className="my-account-form-group">
                <label>Organization</label>
                <input
                  type="text"
                  value="Itahari International College"
                  required
                />
              </div>
            </div>

            <div className="my-account-button-group">
              <Button
                variant="contained"
                type="submit"
                className="my-account-save-btn"
              >
                Save
              </Button>
              <Button
                variant="outlined"
                type="reset"
                className="my-account-save-btn"
              >
                Cancel
              </Button>
            </div>
          </form>
        </section>
        {/* <Button></Button> */}
        {/* Password Section */}
        {/* <section
          className={`my-account-tab-content ${
            activeTab === "password" ? "active" : ""
          }`}
        >
          <h1>Change your password</h1>
          <form>
            <div className="my-account-form-group">
              <label>
                Old password <span>*</span>
              </label>
              <input type="password" required />
            </div>
            <div className="my-account-form-group">
              <label>
                New password <span>*</span>
              </label>
              <input type="password" required />
            </div>
            <div className="my-account-form-group">
              <label>
                Confirm new password <span>*</span>
              </label>
              <input type="password" required />
            </div>
            <button type="submit" className="my-account-save-btn">
              Correct & Save Info
            </button>
          </form>
        </section> */}
      </main>
    </div>
  );
}

export default MyAccount;
