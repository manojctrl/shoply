import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore, useThemeStore } from '../../context/stores';

export default function AdminHeader() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const isDark = useThemeStore((state) => state.isDark);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getPageTitle = () => {
    const titles = {
      '/admin': 'Dashboard',
      '/admin/products': 'Manage Products',
      '/admin/orders': 'Manage Orders',
      '/admin/users': 'Manage Users',
      '/admin/categories': 'Manage Categories',
    };
    return titles[pathname] || 'Admin Panel';
  };

  return (
    <header className="border-b border-gray-200 bg-white px-6 py-4 dark:border-gray-700 dark:bg-gray-900">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{getPageTitle()}</h1>
        <div className="flex items-center space-x-6">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {isDark ? '☀️' : '🌙'}
          </button>
          <div className="h-9 w-9 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold text-sm">
            {user?.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-900 dark:text-white">{user?.name}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">Admin</span>
          </div>
          <button
            onClick={handleLogout}
            className="text-sm text-red-500 hover:text-red-700 dark:text-red-400 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
