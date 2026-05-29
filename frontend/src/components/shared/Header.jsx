import React from 'react';
import { useAuthStore } from '../context/stores';

export default function Header() {
  const user = useAuthStore((state) => state.user);

  return (
    <header className="border-b border-gray-200 bg-white px-6 py-4 dark:border-gray-700 dark:bg-gray-900">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-500 text-white font-bold">
            S
          </div>
          <span className="text-xl font-bold text-gray-900 dark:text-white">Shoply</span>
        </div>
        {user && (
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600 dark:text-gray-300">Welcome, {user.name}</span>
            <div className="h-8 w-8 rounded-full bg-primary-500 text-white flex items-center justify-center text-sm font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
