import React, { useEffect, useState } from 'react';
import { categoriesAPI, productsAPI } from '../../services/api';
import { formatCurrency } from '../../utils/helpers';

const emptyForm = {
  name: '',
  brand: '',
  price: '',
  originalPrice: '',
  discount: '',
  rating: '',
  image: '',
  category: '',
  subcategory: '',
  countInStock: '',
};

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    setError('');
    try {
      const [productsResponse, categoriesResponse] = await Promise.all([
        productsAPI.getAll(),
        categoriesAPI.getAll(),
      ]);
      setProducts(productsResponse.data);
      setCategories(categoriesResponse.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData(emptyForm);
    setEditingId('');
  };

  const handleEdit = (product) => {
    setEditingId(product._id);
    setFormData({
      name: product.name || '',
      brand: product.brand || '',
      price: product.price || '',
      originalPrice: product.originalPrice || '',
      discount: product.discount || '',
      rating: product.rating || '',
      image: product.image || '',
      category: product.category || '',
      subcategory: product.subcategory || '',
      countInStock: product.countInStock || '',
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    const payload = {
      ...formData,
      price: Number(formData.price),
      originalPrice: Number(formData.originalPrice || formData.price),
      discount: Number(formData.discount || 0),
      rating: Number(formData.rating || 0),
      countInStock: Number(formData.countInStock || 0),
    };

    try {
      if (editingId) {
        await productsAPI.update(editingId, payload);
      } else {
        await productsAPI.create(payload);
      }
      resetForm();
      await loadData();
    } catch (err) {
      const validation = err.response?.data?.errors?.map((item) => item.message).join('. ');
      setError(validation || err.response?.data?.message || 'Could not save product');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await productsAPI.delete(id);
      await loadData();
    } catch (err) {
      setError(err.response?.data?.message || 'Could not delete product');
    }
  };

  const handleSeed = async () => {
    await productsAPI.seed();
    await loadData();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Products</h1>
        <button onClick={handleSeed} className="btn-outline">Seed Products</button>
      </div>

      {error && <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">{error}</div>}

      <form onSubmit={handleSubmit} className="card grid grid-cols-1 gap-4 md:grid-cols-3">
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Product name" className="input" required />
        <input name="brand" value={formData.brand} onChange={handleChange} placeholder="Brand" className="input" required />
        <input name="image" value={formData.image} onChange={handleChange} placeholder="Image URL" className="input" required />
        <input name="price" value={formData.price} onChange={handleChange} type="number" step="0.01" placeholder="Price" className="input" required />
        <input name="originalPrice" value={formData.originalPrice} onChange={handleChange} type="number" step="0.01" placeholder="Original price" className="input" required />
        <input name="discount" value={formData.discount} onChange={handleChange} type="number" placeholder="Discount" className="input" />
        <select name="category" value={formData.category} onChange={handleChange} className="input" required>
          <option value="">Select category</option>
          {categories.map((category) => <option key={category._id}>{category.name}</option>)}
        </select>
        <input name="subcategory" value={formData.subcategory} onChange={handleChange} placeholder="Subcategory" className="input" />
        <input name="countInStock" value={formData.countInStock} onChange={handleChange} type="number" placeholder="Stock" className="input" />
        <div className="flex gap-3 md:col-span-3">
          <button className="btn-primary">{editingId ? 'Update Product' : 'Add Product'}</button>
          {editingId && <button type="button" onClick={resetForm} className="btn-outline">Cancel</button>}
        </div>
      </form>

      <div className="card overflow-x-auto">
        {loading ? (
          <p>Loading products...</p>
        ) : (
          <table className="w-full min-w-[760px]">
            <thead className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">Product</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Category</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Price</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Stock</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {products.map((product) => (
                <tr key={product._id}>
                  <td className="px-4 py-4 text-sm font-medium">{product.name}</td>
                  <td className="px-4 py-4 text-sm">{product.category}</td>
                  <td className="px-4 py-4 text-sm font-semibold">{formatCurrency(product.price)}</td>
                  <td className="px-4 py-4 text-sm">{product.countInStock} units</td>
                  <td className="space-x-3 px-4 py-4 text-sm">
                    <button onClick={() => handleEdit(product)} className="text-primary-500 hover:text-primary-700">Edit</button>
                    <button onClick={() => handleDelete(product._id)} className="text-red-500 hover:text-red-700">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
