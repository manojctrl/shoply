import React from 'react';
import { FiSearch, FiShoppingBag, FiUser } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../context/stores';

export default function Header() {
  const user = useAuthStore((state) => state.user);

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/95 px-4 py-3 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90 sm:px-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-950 text-lg font-black text-white dark:bg-white dark:text-slate-950">
            S
          </span>
          <span className="text-xl font-black text-slate-950 dark:text-white">Shoply</span>
        </Link>

        <label className="hidden min-w-0 flex-1 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900 md:flex">
          <FiSearch className="h-4 w-4 flex-shrink-0" />
          <input
            type="search"
            placeholder="Search headphones, home goods, fashion..."
            className="min-w-0 flex-1 bg-transparent text-slate-900 outline-none placeholder:text-slate-400 dark:text-slate-100"
          />
        </label>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link to="/cart" className="btn-outline h-10 w-10 p-0" aria-label="Open cart">
            <FiShoppingBag className="h-5 w-5" />
          </Link>
          <Link to="/account" className="btn-outline h-10 w-10 p-0" aria-label="Open account">
            {user ? (
              <span className="text-sm font-bold">{user.name.charAt(0).toUpperCase()}</span>
            ) : (
              <FiUser className="h-5 w-5" />
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
