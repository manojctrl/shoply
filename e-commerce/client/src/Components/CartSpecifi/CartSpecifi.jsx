import React from "react";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { useDialog } from "../../ContextProvider/ContextProvider";
import './CartSpecifi.css';

const CartSpecifi = () => {
  const { cartItems, removeFromCart, updateCartQty } = useDialog();

  const sizes = ["S", "M", "L", "XL", "XXL"];

  const handleSizeChange = (item, newSize) => {
    // If there is already an item of the new size, merge them, otherwise change size
    const existing = cartItems.find(x => x.product === item.product && x.size === newSize);
    if (existing) {
      removeFromCart(item.product, item.size);
      updateCartQty(item.product, newSize, existing.qty + item.qty);
    } else {
      removeFromCart(item.product, item.size);
      // We can add it back with new size
      updateCartQty(item.product, newSize, item.qty);
    }
  };

  const handleIncrease = (item) => {
    updateCartQty(item.product, item.size, item.qty + 1);
  };

  const handleDecrease = (item) => {
    if (item.qty > 1) {
      updateCartQty(item.product, item.size, item.qty - 1);
    }
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const totalMrp = cartItems.reduce((acc, item) => acc + (item.originalPrice || item.price) * item.qty, 0);
  const discountMrp = totalMrp - subtotal;
  const shipping = subtotal > 2000 || subtotal === 0 ? 0 : 150;
  const totalAmount = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="cart-sp-container" style={{ textAlign: "center", padding: "80px 20px" }}>
        <h2>Your Shopping Cart is Empty</h2>
        <p style={{ marginTop: "15px", marginBottom: "25px" }}>Add items to your cart to start shopping.</p>
        <Link to="/" className="place-order-btn-sp" style={{ display: "inline-block", padding: "12px 30px", textDecoration: "none" }}>
          CONTINUE SHOPPING
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-sp-container">
      <div className="carting">
        <div className="cart-title">Shopping Cart</div>
        <div className="out-of-stock">{cartItems.length} Items in your cart</div>
      </div>
      
      <div className="cart-sp">
        <div className="cart-sp-content">
          {cartItems.map((item, idx) => (
            <div className="cart-sp-items" key={`${item.product}-${item.size}-${idx}`}>
              {/* Close/Delete Button */}
              <button 
                className="remove-item-btn"
                onClick={() => removeFromCart(item.product, item.size)}
              >
                <IoClose size={20} />
              </button>
              
              <div className="cart-sp-image">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="items-sp-details">
                <div className="item-sp-brand">{item.brand}</div>
                <div className="items-sp-name">{item.name}</div>
                
                {/* Size Selection */}
                <div className="item-sp-size">
                  <span className="size-label-sp">Size:</span>
                  <div className="size-options">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        className={`size-option ${item.size === size ? 'active' : ''}`}
                        onClick={() => handleSizeChange(item, size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="quantity-selector">
                  <span className="quantity-label">Quantity:</span>
                  <div className="quantity-controls">
                    <button className="quantity-btn" onClick={() => handleDecrease(item)}>-</button>
                    <span className="quantity-value">{item.qty}</span>
                    <button className="quantity-btn" onClick={() => handleIncrease(item)}>+</button>
                  </div>
                </div>

                <div className="item-price-sp">
                  <span className="current-price-sp">Rs{item.price}</span>
                  {item.originalPrice && item.originalPrice > item.price && (
                    <>
                      <span className="original-price-sp">Rs{item.originalPrice}</span>
                      <span className="discount-sp">{item.discount}% OFF</span>
                    </>
                  )}
                </div>
                <div className="return-info-sp">14 days return available</div>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary-sp">
          <div className="price-details-sp">
            <div className="price-title-sp">PRICE DETAILS ({cartItems.length} items)</div>
            <div className="price-row-sp">
              <span className="price-label-sp">Total MRP</span>
              <span className="price-value-sp">Rs{totalMrp}</span>
            </div>
            {discountMrp > 0 && (
              <div className="price-row-sp">
                <span className="price-label-sp">Discount on MRP</span>
                <span className="price-value-sp discount-value-sp">- Rs{discountMrp}</span>
              </div>
            )}
            <div className="price-row-sp">
              <span className="price-label-sp">Platform Fee</span>
              <span className="price-value-sp">FREE</span>
            </div>
            <div className="price-row-sp">
              <span className="price-label-sp">Shipping Fee</span>
              <span className="price-value-sp">{shipping === 0 ? "FREE" : `Rs${shipping}`}</span>
            </div>
            <div className="total-amount-sp">
              <span>Total Amount</span>
              <span>Rs{totalAmount}</span>
            </div>
          </div>
          <Link to="/checkout" className="place-order-btn-sp">PLACE ORDER</Link>
        </div>
      </div>
    </div>
  );
};

export default CartSpecifi;