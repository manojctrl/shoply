import React from 'react';

export default function ProductsPage() {
  return (
    <div className="px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Products</h1>
        <div className="flex gap-4">
          <input
            type="search"
            placeholder="Search products..."
            className="input flex-1"
          />
          <select className="input w-48">
            <option>All Categories</option>
            <option>Electronics</option>
            <option>Fashion</option>
            <option>Home & Garden</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array(12).fill(0).map((_, i) => (
          <div key={i} className="card hover:shadow-lg transition-shadow">
            <div className="bg-gray-100 dark:bg-gray-700 h-48 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-gray-400">Product Image</span>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Product {i + 1}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">High-quality product</p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-primary-500">$99.99</span>
              <button className="btn-primary text-sm">Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
