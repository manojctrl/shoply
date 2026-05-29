import React from 'react';
import { useAuthStore } from '../../context/stores';

export default function Navbar() {
  return (
    <nav className="border-b border-gray-200 bg-white px-6 py-3 dark:border-gray-700 dark:bg-gray-900">
      <div className="flex items-center justify-between">
        <div className="flex space-x-6">
          <a href="/" className="text-gray-600 hover:text-primary-500 dark:text-gray-300 transition-colors">
            Home
          </a>
          <a href="/products" className="text-gray-600 hover:text-primary-500 dark:text-gray-300 transition-colors">
            Products
          </a>
          <a href="/about" className="text-gray-600 hover:text-primary-500 dark:text-gray-300 transition-colors">
            About
          </a>
        </div>
        <div className="flex items-center space-x-4">
          <a href="/cart" className="text-gray-600 hover:text-primary-500 dark:text-gray-300 transition-colors">
            Cart
          </a>
          <a href="/account" className="text-gray-600 hover:text-primary-500 dark:text-gray-300 transition-colors">
            Account
          </a>
        </div>
      </div>
    </nav>
  );
}
