import React from 'react';

export default function CheckoutPage() {
  return (
    <div className="px-6 py-12 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Checkout</h1>

      <div className="space-y-6">
        {/* Shipping Address */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Shipping Address</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Full Name" className="input" />
            <input type="email" placeholder="Email" className="input" />
            <input type="text" placeholder="Street Address" className="input md:col-span-2" />
            <input type="text" placeholder="City" className="input" />
            <input type="text" placeholder="Postal Code" className="input" />
            <input type="text" placeholder="Country" className="input md:col-span-2" />
          </div>
        </div>

        {/* Payment Method */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Payment Method</h2>
          <div className="space-y-2">
            <label className="flex items-center">
              <input type="radio" name="payment" defaultChecked className="mr-3" />
              <span className="text-gray-700 dark:text-gray-300">Credit Card</span>
            </label>
            <label className="flex items-center">
              <input type="radio" name="payment" className="mr-3" />
              <span className="text-gray-700 dark:text-gray-300">PayPal</span>
            </label>
            <label className="flex items-center">
              <input type="radio" name="payment" className="mr-3" />
              <span className="text-gray-700 dark:text-gray-300">Bank Transfer</span>
            </label>
          </div>
        </div>

        {/* Order Summary */}
        <div className="card bg-primary-50 dark:bg-primary-950 border border-primary-200 dark:border-primary-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Order Summary</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
              <span>$299.97</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Shipping</span>
              <span>$10.00</span>
            </div>
            <div className="flex justify-between border-t border-primary-200 dark:border-primary-700 pt-2 font-bold">
              <span>Total</span>
              <span>$309.97</span>
            </div>
          </div>
        </div>

        <button className="btn-primary w-full text-lg py-3">Place Order</button>
      </div>
    </div>
  );
}
