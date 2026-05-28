import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { IoBagCheckOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useDialog } from "../../ContextProvider/ContextProvider";
import API from "../../services/api";
import "./Checkout.css";

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, userInfo, clearCart } = useDialog();

  // Form states
  const [fullName, setFullName] = useState(userInfo?.name || "");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState(userInfo?.email || "");
  const [province, setProvince] = useState("Bagmati");
  const [district, setDistrict] = useState("Kathmandu");
  const [delivery, setDelivery] = useState("normal");
  const [payment, setPayment] = useState("cod");
  const [errorMsg, setErrorMsg] = useState("");

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shipping = delivery === "express" ? 150 : 0;
  const totalAmount = subtotal + shipping;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!userInfo) {
      setErrorMsg("Please sign in to place an order.");
      navigate("/login");
      return;
    }

    if (cartItems.length === 0) {
      setErrorMsg("Your cart is empty.");
      return;
    }

    const orderPayload = {
      orderItems: cartItems.map((item) => ({
        name: item.name,
        qty: item.qty,
        image: item.image,
        price: item.price,
        product: item.product,
      })),
      shippingAddress: {
        address: `${address}, ${province}, ${district}`,
        city: city,
        phone: phone,
      },
      paymentMethod: payment === "cod" ? "Cash on Delivery" : payment.toUpperCase(),
      totalPrice: totalAmount,
    };

    try {
      await API.post("/orders", orderPayload);
      clearCart();
      navigate("/my-order");
    } catch (error) {
      console.error(error);
      setErrorMsg(error.response?.data?.message || "Failed to place order. Try again.");
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout-container" style={{ textAlign: "center", padding: "100px 20px" }}>
        <h2>Your Cart is Empty</h2>
        <p style={{ marginTop: "15px", marginBottom: "25px" }}>You cannot checkout with an empty cart.</p>
        <Button variant="contained" onClick={() => navigate("/")}>Go Home</Button>
      </div>
    );
  }

  return (
    <section className="checkout-container">
      <div className="checkout-form">
        <form onSubmit={handleSubmit}>
          <h3>Billing Details</h3>
          {errorMsg && <p className="error-message" style={{ color: "red", marginBottom: "15px" }}>{errorMsg}</p>}

          {/* Full Name and Country */}
          <div className="two-column-grid">
            <TextField
              label="Full Name"
              variant="standard"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Country"
              variant="standard"
              value="Nepal"
              fullWidth
              disabled
            />
          </div>

          {/* Street Address */}
          <h3>Street Address</h3>
          <TextField
            label="House Number and Street Name"
            variant="standard"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            fullWidth
            required
          />

          {/* Province and District */}
          <div className="two-column-grid">
            <FormControl variant="standard" fullWidth>
              <InputLabel>Province *</InputLabel>
              <Select
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                required
              >
                <MenuItem value="Koshi">Koshi Pradesh</MenuItem>
                <MenuItem value="Madhesh">Madhesh Pradesh</MenuItem>
                <MenuItem value="Bagmati">Bagmati Pradesh</MenuItem>
                <MenuItem value="Gandaki">Gandaki Pradesh</MenuItem>
                <MenuItem value="Lumbini">Lumbini Pradesh</MenuItem>
                <MenuItem value="Karnali">Karnali Pradesh</MenuItem>
                <MenuItem value="Sudurpaschim">Sudurpaschim Pradesh</MenuItem>
              </Select>
            </FormControl>

            <FormControl variant="standard" fullWidth>
              <InputLabel>District *</InputLabel>
              <Select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                required
              >
                <MenuItem value="Sunsari">Sunsari</MenuItem>
                <MenuItem value="Kathmandu">Kathmandu</MenuItem>
                <MenuItem value="Morang">Morang</MenuItem>
                <MenuItem value="Jhapa">Jhapa</MenuItem>
                <MenuItem value="Chitwan">Chitwan</MenuItem>
              </Select>
            </FormControl>
          </div>

          {/* City and ZIP */}
          <div className="two-column-grid">
            <TextField
              label="City / Town"
              variant="standard"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              fullWidth
              required
            />
            <TextField
              label="ZIP Code"
              variant="standard"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              fullWidth
              required
            />
          </div>

          {/* Phone and Email */}
          <div className="two-column-grid">
            <TextField
              label="Phone Number *"
              variant="standard"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Email Address"
              variant="standard"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
            />
          </div>

          {/* Delivery Option */}
          <FormControl variant="standard" fullWidth style={{ marginTop: "15px" }}>
            <InputLabel>Delivery Option *</InputLabel>
            <Select
              value={delivery}
              onChange={(e) => setDelivery(e.target.value)}
              required
            >
              <MenuItem value="normal">Normal Delivery (Free)</MenuItem>
              <MenuItem value="express">Express Delivery (Rs. 150)</MenuItem>
              <MenuItem value="self">Self Pickup</MenuItem>
            </Select>
          </FormControl>

          {/* Payment Method */}
          <FormControl variant="standard" fullWidth style={{ marginTop: "15px" }}>
            <InputLabel>Payment Method *</InputLabel>
            <Select
              value={payment}
              onChange={(e) => setPayment(e.target.value)}
              required
            >
              <MenuItem value="cod">Cash on Delivery</MenuItem>
              <MenuItem value="esewa">Esewa</MenuItem>
              <MenuItem value="khalti">Khalti</MenuItem>
              <MenuItem value="bank">Bank Transfer</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            type="submit"
            color="primary"
            fullWidth
            sx={{ marginTop: "30px", padding: "12px" }}
          >
            PLACE ORDER
          </Button>
        </form>
      </div>

      <div className="payment-final-product-details">
        <h2>Your Order</h2>

        <div className="order-table-wrapper">
          <table cellSpacing="0" cellPadding="10">
            <thead>
              <tr>
                <th>Product Image</th>
                <th>Product Details</th>
                <th>Sub Total</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, idx) => (
                <tr key={`${item.product}-${item.size}-${idx}`}>
                  <td>
                    <img
                      src={item.image}
                      alt={item.name}
                      width="60"
                      height="60"
                      style={{ borderRadius: "8px", objectFit: "cover" }}
                    />
                  </td>
                  <td>
                    {item.name} <br />
                    <small style={{ color: "#666" }}>Size: {item.size} x {item.qty}</small>
                  </td>
                  <td>Rs{item.price * item.qty}</td>
                </tr>
              ))}
              <tr>
                <td colSpan="2" style={{ textAlign: "right" }}>
                  <strong>Subtotal</strong>
                </td>
                <td>
                  <strong>Rs{subtotal}</strong>
                </td>
              </tr>
              <tr>
                <td colSpan="2" style={{ textAlign: "right" }}>
                  <strong>Shipping</strong>
                </td>
                <td>
                  <strong>Rs{shipping}</strong>
                </td>
              </tr>
              <tr>
                <td colSpan="2" style={{ textAlign: "right" }}>
                  <strong>Total Amount</strong>
                </td>
                <td>
                  <strong>Rs{totalAmount}</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <Button 
          variant="contained" 
          onClick={handleSubmit}
          className="checkout-final-btn"
          sx={{ marginTop: "20px", display: "flex", gap: "10px", width: "100%", padding: "12px" }}
        >
          <IoBagCheckOutline size={20} /> Place Order
        </Button>
      </div>
    </section>
  );
};

export default Checkout;
