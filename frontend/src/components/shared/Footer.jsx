import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-gray-50 px-6 py-12 dark:border-gray-700 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">About Shoply</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Your ultimate e-commerce destination for quality products and exceptional customer service.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><a href="/" className="hover:text-primary-500 transition-colors">Home</a></li>
              <li><a href="/products" className="hover:text-primary-500 transition-colors">Products</a></li>
              <li><a href="/contact" className="hover:text-primary-500 transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><a href="/help" className="hover:text-primary-500 transition-colors">Help Center</a></li>
              <li><a href="/faq" className="hover:text-primary-500 transition-colors">FAQ</a></li>
              <li><a href="/shipping" className="hover:text-primary-500 transition-colors">Shipping Info</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><a href="/privacy" className="hover:text-primary-500 transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-primary-500 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>&copy; {currentYear} Shoply. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
