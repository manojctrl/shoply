import React from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Products', to: '/products' },
  { label: 'Orders', to: '/orders' },
];

export default function Navbar() {
  return (
    <nav className="border-b border-slate-200 bg-white px-4 dark:border-slate-800 dark:bg-slate-950 sm:px-6">
      <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto py-3">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `whitespace-nowrap rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                isActive
                  ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white'
              }`
            }
            end={item.to === '/'}
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
