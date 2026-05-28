import React, { useEffect } from "react";
import { useDialog } from "../../ContextProvider/ContextProvider";
import { IoClose } from "react-icons/io5";

import "./Cart.css";
import { Button } from "@mui/material";
import fashion2 from "../../assets/images/fashion2.jpg";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartDrawer, closedDrawer, cartItems, removeFromCart } = useDialog();

  if (!cartDrawer) return null;

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shipping = subtotal > 2000 || subtotal === 0 ? 0 : 150;
  const total = subtotal + shipping;

  return (
    <div className="cart-main-container" onClick={closedDrawer}>
      <div
        className="cart-container"
        onClick={(e) => e.stopPropagation()} // prevent close when clicked inside drawer
      >
        <div className="cart-header">
          <h2>Shopping cart ({cartCount}) </h2>
          <Button className="close-btn" onClick={closedDrawer}>
            <IoClose />
          </Button>
        </div>

        <div className="cart-items-scroll">
          {cartItems.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px 20px" }}>
              Your cart is empty.
            </div>
          ) : (
            cartItems.map((item, idx) => (
              <div className="cart-content" key={`${item.product}-${item.size}-${idx}`}>
                <div className="cart-item-details">
                  <div className="cart-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="cart-items-info">
                    <h2>{item.name}</h2>
                    <span>{item.brand}</span>
                    <span>Size: {item.size} | Quantity: {item.qty}</span>
                    <span>Price: Rs{item.price}</span>
                  </div>
                </div>
                <div className="cart-delete-btn">
                  <Button className="dustbin-hell" onClick={() => removeFromCart(item.product, item.size)}>
                    <IoClose size={18} />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cart-summary">
          <div className="summary-row">
            <span>Items Subtotal</span>
            <span>Rs{subtotal}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>{shipping === 0 ? "FREE" : `Rs${shipping}`}</span>
          </div>
          <div className="summary-row">
            <span>Total</span>
            <span>Rs{total}</span>
          </div>
        </div>

        <div className="cart-divider"></div>

        <div className="cart-actions">
          <div className="cart-actions-btn">
            <Link to="/cart" onClick={closedDrawer}>
              <button className="btn-view">VIEW CART</button>
            </Link>
          </div>
          <div className="cart-actions-btn">
            <Link to="/checkout" onClick={closedDrawer}>
              <button className="btn-checkout" disabled={cartItems.length === 0}>CHECKOUT</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;