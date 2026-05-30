import React, { useEffect, useState } from 'react';
import { ordersAPI } from '../services/api';
import { formatCurrency, formatDate } from '../utils/helpers';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const response = await ordersAPI.getMine();
        setOrders(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Could not load orders');
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  return (
    <div className="px-6 py-12">
      <h1 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">My Orders</h1>

      {error && <div className="mb-5 rounded-lg bg-red-50 p-4 text-sm text-red-600">{error}</div>}

      {loading ? (
        <div className="card">Loading orders...</div>
      ) : orders.length === 0 ? (
        <div className="card">No orders yet.</div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="card">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Order #{order._id.slice(-6).toUpperCase()}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Placed on {formatDate(order.createdAt)}</p>
                </div>
                <span className={`badge ${order.status === 'Completed' ? 'badge-success' : order.status === 'Cancelled' ? 'badge-danger' : 'badge-warning'}`}>
                  {order.status}
                </span>
              </div>
              <div className="border-t border-gray-200 pt-4 dark:border-gray-700">
                <p className="mb-2 text-gray-600 dark:text-gray-400">
                  {order.orderItems?.length || 0} items - Total: {formatCurrency(order.totalPrice)}
                </p>
                <div className="space-y-1 text-sm text-gray-500 dark:text-gray-400">
                  {order.orderItems?.map((item) => (
                    <p key={`${order._id}-${item.product}`}>{item.qty} x {item.name}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
