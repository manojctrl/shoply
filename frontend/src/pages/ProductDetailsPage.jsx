import React, { useEffect, useState } from 'react';
import { FiCheck, FiHeart, FiMinus, FiPlus, FiShoppingBag, FiStar, FiTruck } from 'react-icons/fi';
import { Link, useParams } from 'react-router-dom';
import { useCartStore } from '../context/stores';
import { productsAPI } from '../services/api';
import { formatCurrency } from '../utils/helpers';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const addItem = useCartStore((state) => state.addItem);
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await productsAPI.getById(id);
        setProduct(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Could not load product');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return <div className="px-6 py-12"><div className="card">Loading product...</div></div>;
  }

  if (error || !product) {
    return <div className="px-6 py-12"><div className="card text-red-600">{error || 'Product not found'}</div></div>;
  }

  return (
    <div className="bg-slate-50 px-4 py-10 dark:bg-slate-950 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <Link to="/products" className="mb-6 inline-flex text-sm font-bold text-slate-600 hover:text-cyan-600 dark:text-slate-300">
          Back to products
        </Link>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="overflow-hidden rounded-lg border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <img src={product.image} alt={product.name} className="aspect-square w-full rounded-lg object-cover" />
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="rounded-lg bg-cyan-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300">
                {product.category}
              </span>
              <span className="inline-flex items-center gap-1 text-sm font-bold text-amber-500">
                <FiStar className="fill-current" /> {product.rating || 0} ({product.reviews?.length || 0} reviews)
              </span>
            </div>

            <h1 className="text-3xl font-black leading-tight text-slate-950 dark:text-white sm:text-4xl">{product.name}</h1>
            <p className="mt-2 text-lg font-semibold text-slate-500 dark:text-slate-400">{product.brand}</p>

            <div className="mt-5 flex items-end gap-3">
              <span className="text-3xl font-black text-slate-950 dark:text-white">{formatCurrency(product.price)}</span>
              {product.originalPrice > product.price && (
                <span className="pb-1 text-lg text-slate-400 line-through">{formatCurrency(product.originalPrice)}</span>
              )}
            </div>

            <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
              <div className="flex items-center gap-3 text-sm font-bold text-slate-800 dark:text-slate-100">
                <FiTruck className="text-cyan-600 dark:text-cyan-300" />
                Stock: {product.countInStock} units. Delivery data is handled during checkout.
              </div>
            </div>

            <div className="mt-6">
              <h2 className="mb-3 font-bold text-slate-950 dark:text-white">Quantity</h2>
              <div className="inline-flex items-center rounded-lg border border-slate-200 bg-white p-1 dark:border-slate-700 dark:bg-slate-950">
                <button onClick={() => setQty((value) => Math.max(1, value - 1))} className="flex h-10 w-10 items-center justify-center rounded-md text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800" aria-label="Decrease quantity">
                  <FiMinus />
                </button>
                <input type="number" value={qty} readOnly className="h-10 w-14 border-0 bg-transparent text-center font-bold text-slate-950 focus:ring-0 dark:text-white" />
                <button onClick={() => setQty((value) => value + 1)} className="flex h-10 w-10 items-center justify-center rounded-md text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800" aria-label="Increase quantity">
                  <FiPlus />
                </button>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto]">
              <button onClick={() => addItem(product, qty)} className="btn-primary py-3">
                <FiShoppingBag /> Add to Cart
              </button>
              <button className="btn-outline py-3">
                <FiHeart /> Save
              </button>
            </div>

            <div className="mt-8 grid gap-3 border-t border-slate-200 pt-6 text-sm text-slate-600 dark:border-slate-800 dark:text-slate-400 sm:grid-cols-2">
              {['Database product', 'Admin editable', 'Cart connected', 'Order ready'].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <FiCheck className="text-emerald-500" /> {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
