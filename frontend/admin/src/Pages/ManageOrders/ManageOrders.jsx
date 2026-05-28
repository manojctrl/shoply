import React, { useEffect, useState } from "react";
import API from "../../services/api";
import "./ManageOrders.css";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    try {
      const { data } = await API.get("/orders");
      setOrders(data);
    } catch (err) {
      setError("Failed to load orders. Make sure you are logged in as admin.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const { data } = await API.put(`/orders/${id}/status`, { status: newStatus });
      setOrders(orders.map((o) => (o._id === id ? { ...o, status: data.status, isPaid: data.isPaid } : o)));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update order status");
    }
  };

  if (loading) return <div className="admin-page-loading">Loading orders...</div>;
  if (error) return <div className="admin-page-error">{error}</div>;

  return (
    <div className="manage-orders-container">
      <h2>Manage Orders</h2>

      <div className="table-responsive">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Items</th>
              <th>Total Price</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="monospace-cell">{order._id}</td>
                <td>
                  <strong>{order.user?.name || "Deleted User"}</strong>
                  <br />
                  <small style={{ color: "#666" }}>{order.user?.email}</small>
                </td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>
                  <ul className="order-items-list-admin">
                    {order.orderItems.map((item, idx) => (
                      <li key={idx}>
                        {item.name} <small>({item.qty}x)</small>
                      </li>
                    ))}
                  </ul>
                </td>
                <td>Rs {order.totalPrice}</td>
                <td>
                  <span className={`payment-status-badge ${order.isPaid ? "paid" : "unpaid"}`}>
                    {order.isPaid ? "Paid" : "Unpaid"}
                  </span>
                  <br />
                  <small style={{ color: "#888", fontSize: "11px" }}>{order.paymentMethod}</small>
                </td>
                <td>
                  <span 
                    className="order-status-badge"
                    style={{
                      backgroundColor: order.status === "Completed" ? "#4caf50" : order.status === "Cancelled" ? "#f44336" : "#ff9800",
                      color: "#fff",
                      padding: "4px 10px",
                      borderRadius: "15px",
                      fontSize: "12px",
                      fontWeight: "bold",
                      textTransform: "uppercase",
                      display: "inline-block"
                    }}
                  >
                    {order.status}
                  </span>
                </td>
                <td>
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    className="order-status-select"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageOrders;
