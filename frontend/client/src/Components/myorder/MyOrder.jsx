import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDialog } from '../../ContextProvider/ContextProvider';
import API from '../../services/api';
import './OrderPage.css';

const MyOrder = () => {
  const { userInfo } = useDialog();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
      return;
    }

    const fetchMyOrders = async () => {
      try {
        const { data } = await API.get('/orders/myorders');
        setOrders(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load your orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyOrders();
  }, [userInfo, navigate]);

  if (loading) {
    return (
      <div className="order-page" style={{ padding: "80px 20px", textAlign: "center" }}>
        <h2>Loading your orders...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="order-page" style={{ padding: "80px 20px", textAlign: "center", color: "red" }}>
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="order-page" style={{ maxWidth: "1000px", margin: "0 auto", padding: "40px 20px" }}>
      <div className="order-header" style={{ textAlign: "center", marginBottom: "30px" }}>
        <h1>My Orders</h1>
        <p className="order-subtitle">View and track your order history</p>
      </div>

      {orders.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 20px", background: "#f9f9f9", borderRadius: "10px" }}>
          <h3>No Orders Placed Yet</h3>
          <p style={{ margin: "15px 0" }}>Start shopping and place your first order!</p>
          <button 
            onClick={() => navigate('/')} 
            className="btn btn-confirm" 
            style={{ display: "inline-block", padding: "10px 25px", border: "none", cursor: "pointer" }}
          >
            Shop Now
          </button>
        </div>
      ) : (
        <div className="orders-list" style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
          {orders.map((order) => (
            <div 
              key={order._id} 
              className="single-order-card"
              style={{
                background: "#ffffff",
                border: "1px solid #e0e0e0",
                borderRadius: "10px",
                padding: "20px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.05)"
              }}
            >
              <div 
                className="order-card-header" 
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "10px",
                  borderBottom: "1px solid #f0f0f0",
                  paddingBottom: "15px",
                  marginBottom: "15px"
                }}
              >
                <div>
                  <span style={{ fontSize: "14px", color: "#666" }}>Order ID: </span>
                  <strong style={{ fontFamily: "monospace", fontSize: "14px" }}>{order._id}</strong>
                  <div style={{ fontSize: "12px", color: "#888", marginTop: "3px" }}>
                    Placed on: {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div 
                    className="order-status-badge"
                    style={{
                      display: "inline-block",
                      padding: "5px 12px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: "bold",
                      textTransform: "uppercase",
                      color: "#fff",
                      backgroundColor: order.status === "Completed" ? "#4caf50" : order.status === "Cancelled" ? "#f44336" : "#ff9800"
                    }}
                  >
                    {order.status}
                  </div>
                  <div style={{ fontWeight: "bold", fontSize: "16px", marginTop: "5px", color: "#333" }}>
                    Total: Rs {order.totalPrice}
                  </div>
                </div>
              </div>

              <div className="order-card-items" style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                {order.orderItems.map((item, index) => (
                  <div 
                    key={index} 
                    className="order-card-item"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "15px"
                    }}
                  >
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        border: "1px solid #eee"
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <h4 style={{ margin: 0, fontSize: "15px", color: "#333" }}>{item.name}</h4>
                      <p style={{ margin: "5px 0 0", fontSize: "13px", color: "#777" }}>
                        Price: Rs {item.price} | Qty: {item.qty}
                      </p>
                    </div>
                    <div style={{ fontWeight: "bold", color: "#555" }}>
                      Rs {item.price * item.qty}
                    </div>
                  </div>
                ))}
              </div>

              <div 
                className="order-card-footer"
                style={{
                  borderTop: "1px solid #f0f0f0",
                  paddingTop: "15px",
                  marginTop: "15px",
                  fontSize: "13px",
                  color: "#666"
                }}
              >
                <strong>Delivery Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.city} <br />
                <strong>Contact Phone:</strong> {order.shippingAddress.phone} | <strong>Payment Method:</strong> {order.paymentMethod}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrder;