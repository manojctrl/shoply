import React, { useState, useEffect, useRef } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import Stack from "@mui/material/Stack";
import Badge from "@mui/material/Badge";
import { FiShoppingCart } from "react-icons/fi";
import { IoGitCompareOutline } from "react-icons/io5";
import { CiHeart, CiUser } from "react-icons/ci";
import Tooltip from "@mui/material/Tooltip";
import { MdOutlineAccountCircle } from "react-icons/md";
import { LuLogOut } from "react-icons/lu";
import { useDialog } from "../../ContextProvider/ContextProvider";
import manoj from "../../assets/images/manoj.jpg";

const Header = () => {
  const { toggleDrawer, userInfo, logoutUser, cartItems } = useDialog();
  const [openProfileMenu, setOpenProfileMenu] = useState(false);
  const menuRef = useRef(null);

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header>
      <div className="container">
        {/* ---- Top Header ---- */}
        <div className="top-header">
          <span>नयाँ सिजनको स्टाइलमा ५०% सम्म छुट पाउनुहोस्</span>

          <div className="right-header">
            <ul>
              <li>
                <Link to="/" className="nav-link">
                  मद्दत केन्द्र
                </Link>
              </li>
              <li>
                <Link to="/order-track" className="nav-link">
                  अर्डर ट्र्याक गर्नुहोस्
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* ---- Middle Header ---- */}
        <div className="middle-header">
          {/* Logo */}
          <div className="logo">
            <h1><Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Shoply</Link></h1>
          </div>

          {/* Navigation */}
          <div className="navigation">
            <div className="search-box">
              <input type="text" placeholder="प्रोडक्ट खोज्नुहोस्" />
              <button>
                <FaMagnifyingGlass size={18} />
              </button>
            </div>
          </div>

          {/* Icons + Login Section */}
          <div className="icons">
            <div className="log-register">
              <ul>
                {/* Profile / Login */}
                <li className="profile-container" ref={menuRef}>
                  {userInfo ? (
                    <div className="profile-wrapper">
                      <div
                        className="profile-trigger"
                        onClick={() => setOpenProfileMenu(!openProfileMenu)}
                      >
                        <div className="profile-avatar">
                          <img src={manoj} alt="profile" />
                        </div>
                        <div className="profile-info">
                          <h4>{userInfo.name}</h4>
                          <p>{userInfo.email}</p>
                        </div>
                      </div>

                      {/* Dropdown Menu */}
                      {openProfileMenu && (
                        <div className="profile-dropdown-menu">
                          <Link
                            to="/profile"
                            style={{
                              textDecoration: "none",
                              color: "inherit",
                            }}
                            onClick={() => setOpenProfileMenu(false)} // ✅ closes when clicked
                          >
                            <div className="dropdown-header">
                              <CiUser className="header-icon" />
                              <h3>Profile</h3>
                            </div>
                          </Link>
                          <Link
                            to="/my-list"
                            style={{
                              textDecoration: "none",
                              color: "inherit",
                            }}
                          >
                            <div
                              className="dropdown-item"
                              onClick={() => setOpenProfileMenu(false)} // ✅ close on click
                            >
                              <MdOutlineAccountCircle className="item-icon" />
                              <span>My List</span>
                            </div>
                          </Link>

                          <div className="dropdown-items">
                            <div
                              className="dropdown-item"
                              onClick={() => setOpenProfileMenu(false)} // ✅ close on click
                            >
                              <MdOutlineAccountCircle className="item-icon" />
                              <Link
                                to="/my-order"
                                style={{
                                  textDecoration: "none",
                                  color: "inherit",
                                }}
                              >
                                <span>My Orders</span>
                              </Link>
                            </div>

                            <div className="dropdown-divider"></div>

                            <div
                              className="dropdown-item logout-item"
                              onClick={() => {
                                logoutUser();
                                setOpenProfileMenu(false);
                              }}
                            >
                              <LuLogOut className="item-icon" />
                              <span>Log out</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link to="/login" className="login-link">
                      <FaUserCircle size={20} />
                      <span>लगइन / दर्ता</span>
                    </Link>
                  )}
                </li>

                {/* Compare */}
                <li>
                  <Tooltip title="Compare">
                    <Stack spacing={2} direction="row" alignItems="center">
                      <Badge color="secondary" badgeContent={3} showZero>
                        <IoGitCompareOutline size={24} />
                      </Badge>
                    </Stack>
                  </Tooltip>
                </li>

                {/* Wishlist */}
                <li>
                  <Tooltip title="Wishlist">
                    <Stack spacing={2} direction="row" alignItems="center">
                      <Badge color="secondary" badgeContent={5} showZero>
                        <CiHeart size={24} />
                      </Badge>
                    </Stack>
                  </Tooltip>
                </li>

                {/* Cart */}
                <li onClick={toggleDrawer} style={{ cursor: "pointer" }}>
                  <Tooltip title="Cart">
                    <Stack spacing={2} direction="row" alignItems="center">
                      <Badge color="secondary" badgeContent={cartCount} showZero>
                        <FiShoppingCart size={24} />
                      </Badge>
                    </Stack>
                  </Tooltip>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
