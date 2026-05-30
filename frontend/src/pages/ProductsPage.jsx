import React, { useEffect, useMemo, useState } from 'react';
import { FiFilter, FiHeart, FiSearch, FiShoppingBag, FiStar } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useCartStore } from '../context/stores';
import { categoriesAPI, productsAPI } from '../services/api';
import { formatCurrency } from '../utils/helpers';

export default function ProductsPage() {
  const addItem = useCartStore((state) => state.addItem);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadProducts = async () => {
    setLoading(true);
    setError('');
    try {
      const params = {};
      if (search.trim()) params.search = search.trim();
      if (category) params.category = category;
      const [productsResponse, categoriesResponse] = await Promise.all([
        productsAPI.getAll(params),
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
    const timer = setTimeout(loadProducts, 250);
    return () => clearTimeout(timer);
  }, [search, category]);

  const categoryOptions = useMemo(
    () => [...new Set(categories.map((item) => item.name).filter(Boolean))],
    [categories]
  );

  const handleSeed = async () => {
    setLoading(true);
    try {
      await Promise.all([productsAPI.seed(), categoriesAPI.seed()]);
      await loadProducts();
    } catch (err) {
      setError(err.response?.data?.message || 'Could not seed products');
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 px-4 py-10 dark:bg-slate-950 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-600 dark:text-cyan-300">Catalog</p>
            <h1 className="mt-2 text-4xl font-black text-slate-950 dark:text-white">Find your next favorite</h1>
            <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-400">
              Products are loaded directly from the backend database.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-[1fr_190px] lg:w-[560px]">
            <label className="input flex items-center gap-2">
              <FiSearch className="h-4 w-4 text-slate-400" />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search products..."
                className="min-w-0 flex-1 bg-transparent outline-none"
              />
            </label>
            <label className="input flex items-center gap-2">
              <FiFilter className="h-4 w-4 text-slate-400" />
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="min-w-0 flex-1 border-0 bg-transparent p-0 text-sm outline-none focus:ring-0 dark:bg-slate-900"
              >
                <option value="">All Categories</option>
                {categoryOptions.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </label>
          </div>
        </div>

        {error && <div className="mb-5 rounded-lg bg-red-50 p-4 text-sm text-red-600">{error}</div>}

        {loading ? (
          <div className="card text-center text-slate-600 dark:text-slate-300">Loading products...</div>
        ) : products.length === 0 ? (
          <div className="card text-center">
            <h2 className="text-xl font-bold text-slate-950 dark:text-white">No products found</h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400">Seed the backend database to add starter products.</p>
            <button onClick={handleSeed} className="btn-primary mt-5">Seed Database</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <article key={product._id} className="group overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
                <Link to={`/products/${product._id}`} className="block">
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                    <img src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                    {product.discount > 0 && (
                      <span className="absolute left-3 top-3 rounded-lg bg-white/90 px-3 py-1 text-xs font-bold text-slate-900">
                        {product.discount}% off
                      </span>
                    )}
                    <button className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-lg bg-white/90 text-slate-700 transition hover:text-rose-500" aria-label={`Save ${product.name}`}>
                      <FiHeart />
                    </button>
                  </div>
                </Link>
                <div className="p-4">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-cyan-600 dark:text-cyan-300">{product.category}</p>
                    <span className="inline-flex items-center gap-1 text-sm font-bold text-amber-500">
                      <FiStar className="fill-current" /> {product.rating || 0}
                    </span>
                  </div>
                  <Link to={`/products/${product._id}`} className="font-bold text-slate-950 hover:text-cyan-700 dark:text-white dark:hover:text-cyan-300">
                    {product.name}
                  </Link>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{product.brand}</p>
                  <div className="mt-4 flex items-center gap-2">
                    <span className="text-xl font-black text-slate-950 dark:text-white">{formatCurrency(product.price)}</span>
                    {product.originalPrice > product.price && (
                      <span className="text-sm text-slate-400 line-through">{formatCurrency(product.originalPrice)}</span>
                    )}
                  </div>
                  <button onClick={() => addItem(product)} className="btn-primary mt-4 w-full">
                    <FiShoppingBag /> Add to Cart
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
