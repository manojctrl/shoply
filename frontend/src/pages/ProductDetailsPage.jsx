import React from 'react';

export default function ProductDetailsPage() {
  return (
    <div className="px-6 py-12 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="bg-gray-100 dark:bg-gray-700 aspect-square rounded-lg flex items-center justify-center mb-4">
            <span className="text-gray-400 text-2xl">Product Image</span>
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Product Name</h1>
          <div className="flex items-center mb-4">
            <span className="text-yellow-400">★★★★★</span>
            <span className="text-gray-600 dark:text-gray-400 ml-2">(125 reviews)</span>
          </div>

          <div className="mb-6">
            <span className="text-3xl font-bold text-primary-500">$99.99</span>
            <span className="ml-4 text-lg text-gray-600 dark:text-gray-400 line-through">$149.99</span>
          </div>

          <p className="text-gray-600 dark:text-gray-400 mb-6">
            This is a high-quality product with excellent features and outstanding durability. Perfect for everyday use.
          </p>

          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Quantity</h3>
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg">-</button>
              <input type="number" value="1" className="w-16 text-center input" />
              <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg">+</button>
            </div>
          </div>

          <div className="flex gap-4 mb-8">
            <button className="btn-primary flex-1">Add to Cart</button>
            <button className="btn-secondary">Save for Later</button>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Product Details</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li>✓ Premium quality materials</li>
              <li>✓ 1-year warranty</li>
              <li>✓ Free shipping on orders over $50</li>
              <li>✓ 30-day money-back guarantee</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
