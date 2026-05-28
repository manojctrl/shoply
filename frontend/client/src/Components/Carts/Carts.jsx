import React from "react";
import { IoClose } from "react-icons/io5";
import { Button } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import {
  FaUserCircle,
  FaHeart,
  FaShoppingBag,
  FaCloudUploadAlt,
} from "react-icons/fa";
import { RiLogoutBoxRLine } from "react-icons/ri";
import fashion2 from "../../assets/images/fashion2.jpg";
import manoj from "../../assets/images/manoj.jpg"; // Make sure to import your profile image
import "./Carts.css";
// import "./MyAccount.css";
import "../../Pages/MyAccount/MyAccount.css";

const Carts = () => {
  return (
    <div className="carts-container-container">
      {/* Sidebar */}
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
              style={{ display: "none" }}
            />
          </div>
          <h2>Welcome, Manoj</h2>
        </div>
        <nav className="my-account-nav-menu">
          <ul>
            <NavLink
              to="/profile"
              style={{ textDecoration: "none", color: "inherit" }}
              className="sidebar-link"
            >
              <li>
                <FaUserCircle className="nav-icon" /> Profile
              </li>
            </NavLink>
            <NavLink
              to="/my-list"
              style={{ textDecoration: "none", color: "inherit" }}
              className="sidebar-link"
            >
              <li>
                <FaHeart className="nav-icon" /> My List
              </li>
            </NavLink>
            <NavLink
              to="/my-orders"
              style={{ textDecoration: "none", color: "inherit" }}
              className="sidebar-link"
            >
              <li>
                <FaShoppingBag className="nav-icon" /> My Orders
              </li>
            </NavLink>
            <NavLink
              to="/"
              style={{ textDecoration: "none", color: "inherit" }}
              className="sidebar-link"
            >
              <li>
                <RiLogoutBoxRLine className="nav-icon" /> Log Out
              </li>
            </NavLink>
          </ul>
        </nav>
      </aside>

      {/* Main Content - Cart */}
      <div className="carts-main-content">
        <div className="carts-my-items-overlay">
          <div className="carts-my-items-wrapper">
            {/* Header */}
            <div className="carts-my-items-header">
              <h2>My List Items</h2>
              <Button className="carts-my-items-close-btn">
                <IoClose size={22} />
              </Button>
            </div>

            {/* Items List */}
            <div className="carts-my-items-list">
              {/* Item 1 */}
              <div className="carts-my-items-item">
                <div className="carts-my-items-details">
                  <div className="carts-my-items-img">
                    <img src={fashion2} alt="item" />
                  </div>
                  <div className="carts-my-items-info">
                    <h2>महिला वाइड लेग हाई-राइज</h2>
                    <span>Track Suit for Women</span>
                  </div>
                </div>

                <div className="carts-my-items-actions">
                  <Button
                    variant="contained"
                    className="carts-my-items-add-btn"
                  >
                    Add to Cart
                  </Button>
                  <Button className="carts-my-items-delete-btn">
                    <IoClose size={18} />
                  </Button>
                </div>
              </div>
              {/* Item 2 */}
              <div className="carts-my-items-item">
                <div className="carts-my-items-details">
                  <div className="carts-my-items-img">
                    <img src={fashion2} alt="item" />
                  </div>
                  <div className="carts-my-items-info">
                    <h2>Men Cotton T-Shirt</h2>
                    <span>Soft Fabric Comfort Wear</span>
                  </div>
                </div>

                <div className="carts-my-items-actions">
                  <Button
                    variant="contained"
                    className="carts-my-items-add-btn"
                  >
                    Add to Cart
                  </Button>
                  <Button className="carts-my-items-delete-btn">
                    <IoClose size={18} />
                  </Button>
                </div>
              </div>
              {/* Item 3 */}
              <div className="carts-my-items-item">
                <div className="carts-my-items-details">
                  <div className="carts-my-items-img">
                    <img src={fashion2} alt="item" />
                  </div>
                  <div className="carts-my-items-info">
                    <h2>Stylish Denim Jacket</h2>
                    <span>Unisex Blue Jacket</span>
                  </div>
                </div>

                <div className="carts-my-items-actions">
                  <Button
                    variant="contained"
                    className="carts-my-items-add-btn"
                  >
                    Add to Cart
                  </Button>
                  <Button className="carts-my-items-delete-btn">
                    <IoClose size={18} />
                  </Button>
                </div>
              </div>
              <div className="carts-my-items-item">
                <div className="carts-my-items-details">
                  <div className="carts-my-items-img">
                    <img src={fashion2} alt="item" />
                  </div>
                  <div className="carts-my-items-info">
                    <h2>Stylish Denim Jacket</h2>
                    <span>Unisex Blue Jacket</span>
                  </div>
                </div>

                <div className="carts-my-items-actions">
                  <Button
                    variant="contained"
                    className="carts-my-items-add-btn"
                  >
                    Add to Cart
                  </Button>
                  <Button className="carts-my-items-delete-btn">
                    <IoClose size={18} />
                  </Button>
                </div>
              </div>
              <div className="carts-my-items-item">
                <div className="carts-my-items-details">
                  <div className="carts-my-items-img">
                    <img src={fashion2} alt="item" />
                  </div>
                  <div className="carts-my-items-info">
                    <h2>Stylish Denim Jacket</h2>
                    <span>Unisex Blue Jacket</span>
                  </div>
                </div>

                <div className="carts-my-items-actions">
                  <Button
                    variant="contained"
                    className="carts-my-items-add-btn"
                  >
                    Add to Cart
                  </Button>
                  <Button className="carts-my-items-delete-btn">
                    <IoClose size={18} />
                  </Button>
                </div>
              </div>{" "}
              <div className="carts-my-items-item">
                <div className="carts-my-items-details">
                  <div className="carts-my-items-img">
                    <img src={fashion2} alt="item" />
                  </div>
                  <div className="carts-my-items-info">
                    <h2>Stylish Denim Jacket</h2>
                    <span>Unisex Blue Jacket</span>
                  </div>
                </div>

                <div className="carts-my-items-actions">
                  <Button
                    variant="contained"
                    className="carts-my-items-add-btn"
                  >
                    Add to Cart
                  </Button>
                  <Button className="carts-my-items-delete-btn">
                    <IoClose size={18} />
                  </Button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="carts-my-items-divider"></div>
            <div className="carts-my-items-footer">
              <div className="carts-my-items-footer-btn">
                <Link to="/cart">
                  <button className="carts-my-items-view-btn">VIEW CART</button>
                </Link>
              </div>
              <div className="carts-my-items-footer-btn">
                <Link to="/checkout">
                  <button className="carts-my-items-checkout-btn">
                    CHECKOUT
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carts;
