import React from 'react';

export default function HomePage() {
  return (
    <div className="space-y-12 py-12 px-6">
      {/* Hero Section */}
      <section className="rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500 px-8 py-16 text-white">
        <div className="max-w-4xl">
          <h1 className="text-5xl font-bold mb-4">Welcome to Shoply</h1>
          <p className="text-xl mb-8 text-white/90">Discover amazing products at unbeatable prices. Shop now and save big!</p>
          <button className="bg-white text-primary-500 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors">
            Start Shopping
          </button>
        </div>
      </section>

      {/* Featured Products */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="card hover:shadow-lg transition-shadow">
              <div className="bg-gray-100 dark:bg-gray-700 h-48 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-gray-400">Product Image</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Product {i}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">High-quality product with excellent features</p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-primary-500">$99.99</span>
                <button className="btn-primary text-sm">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['Electronics', 'Fashion', 'Home & Garden'].map((cat) => (
            <div key={cat} className="card text-center cursor-pointer hover:border-primary-500 dark:hover:border-primary-400 transition-colors">
              <div className="text-4xl mb-4">📦</div>
              <h3 className="font-semibold text-gray-900 dark:text-white text-lg">{cat}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Browse our {cat.toLowerCase()} collection</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
