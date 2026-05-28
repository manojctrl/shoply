import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  FaHome, 
  FaUsers, 
  FaBox, 
  FaTags, 
  FaShoppingCart, 
  FaSignOutAlt,
  FaChevronDown,
  FaChevronRight
} from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [expandedItems, setExpandedItems] = useState({});

  const toggleSubMenu = (itemId) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const menuItems = [
    { 
      id: "dashboard", 
      label: "Dashboard", 
      icon: <FaHome />,
      link: "/dashboard"
    },
    { 
      id: "users", 
      label: "Users", 
      icon: <FaUsers />,
      link: "/users"
    },
    { 
      id: "products", 
      label: "Products", 
      icon: <FaBox />,
      link: "/products",
      subItems: [
        { id: "all-products", label: "All Products", link: "/products" },
        { id: "add-product", label: "Add Product", link: "/products/add" }
      ]
    },
    { 
      id: "orders", 
      label: "Orders", 
      icon: <FaShoppingCart />,
      link: "/orders"
    }
  ];

  return (
    <div className="sidebar-container">
      {/* Sidebar */}
      <div className="sidebar">
        {/* Sidebar Header with Logo */}
        <div className="sidebar-header">
          <div className="logo">
            <span className="logo-icon">
              <FaShoppingCart />
            </span>
            <span className="logo-text">Shoply Admin</span>
          </div>
        </div>

        {/* Sidebar Menu */}
        <div className="sidebar-menu">
          {menuItems.map((item) => (
            <div key={item.id}>
              {item.subItems ? (
                <>
                  <div
                    className={`menu-item ${activeItem === item.label ? "active" : ""}`}
                    onClick={() => toggleSubMenu(item.id)}
                  >
                    <span className="menu-icon">{item.icon}</span>
                    <span className="menu-label">{item.label}</span>
                    <span className="menu-arrow">
                      {expandedItems[item.id] ? <FaChevronDown /> : <FaChevronRight />}
                    </span>
                  </div>
                  {expandedItems[item.id] && (
                    <div className="sub-menu">
                      {item.subItems.map((subItem) => (
                        <Link to={subItem.link} key={subItem.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                          <div
                            className={`sub-menu-item ${activeItem === subItem.label ? "active" : ""}`}
                            onClick={() => setActiveItem(subItem.label)}
                          >
                            <span className="sub-menu-icon">•</span>
                            <span className="sub-menu-label">{subItem.label}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link to={item.link} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div
                    className={`menu-item ${activeItem === item.label ? "active" : ""}`}
                    onClick={() => setActiveItem(item.label)}
                  >
                    <span className="menu-icon">{item.icon}</span>
                    <span className="menu-label">{item.label}</span>
                  </div>
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Search Bar at Bottom (without search icon) */}
       
      </div>
    </div>
  );
};

export default Sidebar;