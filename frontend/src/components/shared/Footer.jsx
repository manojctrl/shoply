import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white px-4 py-12 dark:border-slate-800 dark:bg-slate-950 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 rounded-lg bg-slate-950 p-6 text-white sm:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-black">Better picks, fewer clicks.</h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-300">
                Browse curated essentials and keep your cart ready for the next checkout.
              </p>
            </div>
            <Link to="/products" className="btn-secondary w-fit">
              Shop products <FiArrowRight />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-black text-slate-950 dark:text-white">Shoply</h3>
            <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">
              Everyday essentials selected for quality, usefulness, and a cleaner shopping flow.
            </p>
          </div>
          <div>
            <h3 className="mb-4 font-bold text-slate-950 dark:text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li><Link to="/" className="transition-colors hover:text-cyan-600">Home</Link></li>
              <li><Link to="/products" className="transition-colors hover:text-cyan-600">Products</Link></li>
              <li><Link to="/cart" className="transition-colors hover:text-cyan-600">Cart</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-bold text-slate-950 dark:text-white">Support</h3>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li><a href="/help" className="transition-colors hover:text-cyan-600">Help Center</a></li>
              <li><a href="/faq" className="transition-colors hover:text-cyan-600">FAQ</a></li>
              <li><a href="/shipping" className="transition-colors hover:text-cyan-600">Shipping Info</a></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-bold text-slate-950 dark:text-white">Legal</h3>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li><a href="/privacy" className="transition-colors hover:text-cyan-600">Privacy Policy</a></li>
              <li><a href="/terms" className="transition-colors hover:text-cyan-600">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-200 pt-8 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
          <p>&copy; {currentYear} Shoply. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
