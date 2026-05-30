import React, { useEffect, useState } from 'react';
import { ordersAPI } from '../../services/api';
import { formatCurrency, formatDate } from '../../utils/helpers';

export default function ManageOrders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const loadOrders = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await ordersAPI.getAll();
      setOrders(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not load orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await ordersAPI.updateStatus(id, status);
      await loadOrders();
    } catch (err) {
      setError(err.response?.data?.message || 'Could not update order');
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Orders</h1>
      {error && <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">{error}</div>}

      <div className="card overflow-x-auto">
        {loading ? (
          <p>Loading orders...</p>
        ) : (
          <table className="w-full min-w-[820px]">
            <thead className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">Order ID</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Customer</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Amount</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Date</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {orders.map((order) => (
                <tr key={order._id}>
                  <td className="px-4 py-4 text-sm font-medium">#{order._id.slice(-6).toUpperCase()}</td>
                  <td className="px-4 py-4 text-sm">{order.user?.name || 'Unknown'}</td>
                  <td className="px-4 py-4 text-sm font-semibold">{formatCurrency(order.totalPrice)}</td>
                  <td className="px-4 py-4 text-sm">
                    <span className={`badge ${order.status === 'Completed' ? 'badge-success' : order.status === 'Cancelled' ? 'badge-danger' : 'badge-warning'}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm">{formatDate(order.createdAt)}</td>
                  <td className="px-4 py-4 text-sm">
                    <select value={order.status} onChange={(event) => handleStatusChange(order._id, event.target.value)} className="input min-w-[150px]">
                      <option>Pending</option>
                      <option>Completed</option>
                      <option>Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
