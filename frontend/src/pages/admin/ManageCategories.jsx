import React, { useEffect, useState } from 'react';
import { categoriesAPI } from '../../services/api';

export default function ManageCategories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [subcategoryInputs, setSubcategoryInputs] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const loadCategories = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await categoriesAPI.getAll();
      setCategories(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not load categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleCreate = async (event) => {
    event.preventDefault();
    try {
      await categoriesAPI.create({ name, subcategories: [] });
      setName('');
      await loadCategories();
    } catch (err) {
      setError(err.response?.data?.message || 'Could not create category');
    }
  };

  const handleAddSubcategory = async (categoryId) => {
    const subcategory = subcategoryInputs[categoryId]?.trim();
    if (!subcategory) return;
    try {
      await categoriesAPI.addSubcategory(categoryId, subcategory);
      setSubcategoryInputs((prev) => ({ ...prev, [categoryId]: '' }));
      await loadCategories();
    } catch (err) {
      setError(err.response?.data?.message || 'Could not add subcategory');
    }
  };

  const handleSeed = async () => {
    await categoriesAPI.seed();
    await loadCategories();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Categories</h1>
        <button onClick={handleSeed} className="btn-outline">Seed Categories</button>
      </div>

      {error && <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">{error}</div>}

      <form onSubmit={handleCreate} className="card flex flex-col gap-3 sm:flex-row">
        <input value={name} onChange={(event) => setName(event.target.value)} placeholder="New category name" className="input" required />
        <button className="btn-primary whitespace-nowrap">Add Category</button>
      </form>

      <div className="card overflow-x-auto">
        {loading ? (
          <p>Loading categories...</p>
        ) : (
          <table className="w-full min-w-[680px]">
            <thead className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">Category</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Subcategories</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Add Subcategory</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {categories.map((category) => (
                <tr key={category._id}>
                  <td className="px-4 py-4 text-sm font-medium">{category.name}</td>
                  <td className="px-4 py-4 text-sm">{category.subcategories?.join(', ') || 'None'}</td>
                  <td className="px-4 py-4">
                    <div className="flex gap-2">
                      <input
                        value={subcategoryInputs[category._id] || ''}
                        onChange={(event) => setSubcategoryInputs((prev) => ({ ...prev, [category._id]: event.target.value }))}
                        className="input"
                        placeholder="Subcategory"
                      />
                      <button onClick={() => handleAddSubcategory(category._id)} className="btn-outline" type="button">Add</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Edit/delete category backend endpoints are not available yet, so this page connects list/create/subcategory actions only.
      </p>
    </div>
  );
}
