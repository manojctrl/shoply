import React, { useState } from 'react';

export default function ManageOrders() {
  const [orders] = useState([
    { id: 1001, customer: 'John Doe', amount: 299.97, status: 'Delivered', date: '2024-05-20' },
    { id: 1002, customer: 'Jane Smith', amount: 149.99, status: 'Processing', date: '2024-05-21' },
    { id: 1003, customer: 'Bob Johnson', amount: 79.99, status: 'Shipped', date: '2024-05-22' },
  ]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Orders</h1>

      <div className="card overflow-hidden">
        <table className="w-full">
          <thead className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Order ID</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Customer</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Amount</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="px-6 py-4 text-sm text-gray-900 dark:text-white font-medium">#{order.id}</td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{order.customer}</td>
                <td className="px-6 py-4 text-sm text-gray-900 dark:text-white font-semibold">${order.amount}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`badge ${
                    order.status === 'Delivered' ? 'badge-success' :
                    order.status === 'Shipped' ? 'badge-info' : 'badge-warning'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{order.date}</td>
                <td className="px-6 py-4 text-sm">
                  <button className="text-primary-500 hover:text-primary-700 dark:text-primary-400">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
