import React from 'react';

export default function AdminDashboard() {
  const stats = [
    { label: 'Total Sales', value: '$12,345', change: '+12.5%', icon: '💰' },
    { label: 'Total Orders', value: '256', change: '+8.2%', icon: '📦' },
    { label: 'Total Products', value: '48', change: '+3.1%', icon: '🏷️' },
    { label: 'Total Users', value: '1,234', change: '+5.7%', icon: '👥' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="card">
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl">{stat.icon}</span>
              <span className="text-xs font-semibold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950 px-2 py-1 rounded">
                {stat.change}
              </span>
            </div>
            <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium">{stat.label}</h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Recent Orders</h3>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700 last:border-0">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Order #{1000 + i}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Customer Name</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900 dark:text-white">$99.99</p>
                  <p className="text-xs text-green-600 dark:text-green-400">Delivered</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Top Products</h3>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700 last:border-0">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Product {i}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">12 orders</p>
                </div>
                <span className="text-sm font-bold text-primary-500">$99.99</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
