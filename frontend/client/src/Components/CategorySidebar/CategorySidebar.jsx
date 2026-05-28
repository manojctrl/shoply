import React, { useState } from "react";
import { IoStarSharp } from "react-icons/io5";
import { IoIosArrowUp } from "react-icons/io";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { 
  FaShoppingBasket, 
  FaMobileAlt, 
  FaBriefcase, 
  FaShoePrints, 
  FaGem, 
  FaPiggyBank,
  FaFilter,
  FaDollarSign
} from "react-icons/fa";
import { FaRupeeSign } from "react-icons/fa6";
import './CategorySidebar.css'


const CategorySidebar = () => {
  const categories = [
    { id: 1, label: "Fashion", icon: <FaShoppingBasket /> },
    { id: 2, label: "Electronics", icon: <FaMobileAlt /> },
    { id: 3, label: "Bags", icon: <FaBriefcase /> },
    { id: 4, label: "Footwear", icon: <FaShoePrints /> },
    { id: 5, label: "Jewellary", icon: <FaGem /> },
    { id: 6, label: "Wealth", icon: <FaPiggyBank /> },
  ];

  const [categorie, setCategorie] = useState(true);
  const [priceOpen, setPriceOpen] = useState(true);
  const [ratingOpen, setRatingOpen] = useState(true);

  return (
    <aside className="sidebars">
      <div className="sidebar-header">
        <FaFilter className="filter-icon" />
        <h2>Filters</h2>
      </div>

      <div className="filter-section">
        <div className="section-title" onClick={() => setCategorie(!categorie)}>
          <span>Shop by Category</span>
          {categorie ? <IoIosArrowUp /> : <MdOutlineKeyboardArrowDown />}
        </div>

        {categorie && (
          <ul className="category-list">
            {categories.map((f) => {
              return (
                <li key={f.id}>
                  <span className="category-icon">{f.icon}</span>
                  <span className="category-label">{f.label}</span>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className="filter-section">
        <div className="section-title" onClick={() => setPriceOpen(!priceOpen)}>
          <span>Filter By Price</span>
          {priceOpen ? <IoIosArrowUp /> : <MdOutlineKeyboardArrowDown />}
        </div>

        {priceOpen && (
          <div className="price-content">
            <div className="price-inputs">
              <div className="input-group">
                <FaRupeeSign className="input-icon" />
                <input type="text" placeholder="Min Price" />
              </div>
              <div className="input-group">
                <FaRupeeSign className="input-icon" />
                <input type="text" placeholder="Max Price" />
              </div>
            </div>
            <div className="range-container">
              <input type="range" min="0" max="20000" className="range-slider" />
              <div className="range-values">
                <span>Rs0</span>
                <span>Rs20,000</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="filter-section">
        <div className="section-title" onClick={() => setRatingOpen(!ratingOpen)}>
          <span>Filter By Rating</span>
          {ratingOpen ? <IoIosArrowUp /> : <MdOutlineKeyboardArrowDown />}
        </div>

        {ratingOpen && (
          <div className="rating-content">
            {[5, 4, 3, 2, 1].map((stars, index) => {
              return (
                <label key={index} className="rating-item">
                  <input type="checkbox" />
                  <div className="stars-container">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <IoStarSharp
                        key={j}
                        className={j < stars ? "star filled" : "star"}
                      />
                    ))}
                  </div>
                  <span className="rating-text">& Up</span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      <button className="apply-btn">Apply Filters</button>
    </aside>
  );
};

export default CategorySidebar;