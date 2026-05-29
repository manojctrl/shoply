import React from 'react';

export default function OrdersPage() {
  return (
    <div className="px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">My Orders</h1>

      <div className="space-y-4">
        {Array(5).fill(0).map((_, i) => (
          <div key={i} className="card">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Order #{1000 + i}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Placed on May {i + 1}, 2024</p>
              </div>
              <span className="badge-success">Delivered</span>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <p className="text-gray-600 dark:text-gray-400 mb-2">3 items • Total: $299.97</p>
              <button className="btn-outline text-sm">View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
