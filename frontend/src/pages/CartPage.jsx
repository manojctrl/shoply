import React from 'react';

export default function CartPage() {
  return (
    <div className="px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {Array(3).fill(0).map((_, i) => (
              <div key={i} className="card flex items-center gap-4">
                <div className="bg-gray-100 dark:bg-gray-700 w-24 h-24 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-gray-400">Image</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Product {i + 1}</h3>
                  <p className="text-gray-600 dark:text-gray-400">$99.99</p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded">-</button>
                  <input type="number" value="1" className="w-12 text-center input" />
                  <button className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded">+</button>
                </div>
                <button className="text-red-500 hover:text-red-600">Remove</button>
              </div>
            ))}
          </div>
        </div>

        <div className="card h-fit">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-4 text-lg">Order Summary</h2>
          <div className="space-y-2 mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex justify-between text-gray-600 dark:text-gray-400">
              <span>Subtotal</span>
              <span>$299.97</span>
            </div>
            <div className="flex justify-between text-gray-600 dark:text-gray-400">
              <span>Shipping</span>
              <span>$10.00</span>
            </div>
            <div className="flex justify-between text-gray-600 dark:text-gray-400">
              <span>Tax</span>
              <span>$24.80</span>
            </div>
          </div>
          <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white mb-6">
            <span>Total</span>
            <span>$334.77</span>
          </div>
          <button className="btn-primary w-full">Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
}
