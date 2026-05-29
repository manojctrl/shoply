import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const MENU_ITEMS = [
  { label: 'Dashboard', href: '/admin', icon: '📊' },
  { label: 'Products', href: '/admin/products', icon: '📦' },
  { label: 'Orders', href: '/admin/orders', icon: '📋' },
  { label: 'Users', href: '/admin/users', icon: '👥' },
  { label: 'Categories', href: '/admin/categories', icon: '🏷️' },
];

export default function Sidebar() {
  const { pathname } = useLocation();

  return (
    <aside className="w-64 border-r border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
      <div className="flex items-center space-x-2 border-b border-gray-200 px-6 py-4 dark:border-gray-700">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-500 text-white font-bold">
          S
        </div>
        <span className="text-lg font-bold text-gray-900 dark:text-white">Shoply Admin</span>
      </div>
      <nav className="space-y-2 p-4">
        {MENU_ITEMS.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={`flex items-center space-x-3 rounded-lg px-4 py-3 transition-colors ${
              pathname === item.href
                ? 'bg-primary-50 text-primary-600 dark:bg-primary-900 dark:text-primary-100'
                : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
