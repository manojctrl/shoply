import React, { useState } from 'react';

export default function ManageCategories() {
  const [categories] = useState([
    { id: 1, name: 'Electronics', description: 'Electronic devices and gadgets', products: 15 },
    { id: 2, name: 'Fashion', description: 'Clothing and accessories', products: 28 },
    { id: 3, name: 'Home & Garden', description: 'Home and garden items', products: 12 },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Categories</h1>
        <button className="btn-primary">+ Add Category</button>
      </div>

      <div className="card overflow-hidden">
        <table className="w-full">
          <thead className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Category Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Description</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Products</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {categories.map((category) => (
              <tr key={category.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="px-6 py-4 text-sm text-gray-900 dark:text-white font-medium">{category.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{category.description}</td>
                <td className="px-6 py-4 text-sm text-gray-900 dark:text-white font-semibold">{category.products}</td>
                <td className="px-6 py-4 text-sm space-x-2">
                  <button className="text-primary-500 hover:text-primary-700 dark:text-primary-400">Edit</button>
                  <button className="text-red-500 hover:text-red-700 dark:text-red-400">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
