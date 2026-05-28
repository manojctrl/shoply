import Button from "@mui/material/Button";
import React from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { PiRectangleDashedThin } from "react-icons/pi";
import { Link } from "react-router-dom";
import { useDialog } from "../../ContextProvider/ContextProvider";

const Product = ({ image, discount, brand, name, rating, price, originalPrice, id }) => {
  const { dialogOpen } = useDialog();

  const handleEyeClick = (e) => {
    e.preventDefault(); // Prevent Link navigation
    e.stopPropagation(); // Stop event propagation
    console.log("Opening dialog for product:", { image, discount, brand, name, rating, price, originalPrice, id });
    const product = { image, discount, brand, name, rating, price, originalPrice, id };
    dialogOpen(product);
  };

  return (
    // <Link to={`/product/${id}`} style={{ textDecoration: "none", color: "inherit" }}>
      <div className="product-list">
        <div className="product-img-container">
          <Link to={`/product/${id}`} style={{ textDecoration: "none", color: "inherit" }}>

          <img className="product-img" src={image} alt={name} />
          </Link>
          <div className="hover-buttons">
            <button className="hover-btn" onClick={handleEyeClick}>
              <IoEyeOutline />
            </button>
            <button className="hover-btn">
              <FaRegHeart />
            </button>
            <button className="hover-btn">
              <PiRectangleDashedThin />
            </button>
          </div>
        </div>
        <div className="discount">{discount}% OFF</div>
        <Link to={`/product/${id}`} style={{ textDecoration: "none", color: "inherit" }}>
        <div className="product-details">
          <p>{brand}</p>
          <h3>{name}</h3>
          <div className="rating">
            {"★".repeat(rating)} ({rating}/5)
          </div>
          
          <div className="price-container">
            <div className="original-price">Rs{originalPrice}</div>
            <div className="discounted-price">Rs{price}</div>
          </div>
          <div className="add-cart">
            <Button variant="outlined" className="add-to-cart">
              <MdOutlineShoppingCart /> ADD TO CART
            </Button>
          </div>
        </div>
        </Link>
      </div>
    // </Link>
  );
};

export default Product;