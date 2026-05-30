import React, { useEffect, useMemo, useState } from 'react';
import { FiArrowRight, FiShield, FiTruck, FiZap } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { categoriesAPI, productsAPI } from '../services/api';
import { formatCurrency } from '../utils/helpers';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const [productsResponse, categoriesResponse] = await Promise.all([
          productsAPI.getAll(),
          categoriesAPI.getAll(),
        ]);
        setProducts(productsResponse.data.slice(0, 4));
        setCategories(categoriesResponse.data.slice(0, 3));
      } catch {
        setProducts([]);
        setCategories([]);
      }
    };

    loadHomeData();
  }, []);

  const heroImages = useMemo(() => products.filter((product) => product.image), [products]);

  return (
    <div className="bg-slate-50 dark:bg-slate-950">
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <img
          src={heroImages[0]?.image || 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1800&q=80'}
          alt="Shoply featured product"
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-900/20" />
        <div className="relative mx-auto grid min-h-[560px] max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="max-w-2xl">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">Live from database</p>
            <h1 className="text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">Shoply</h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-200">
              Browse real products from your MongoDB backend, add them to cart, and place orders.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/products" className="btn-secondary px-6 py-3">
                Start Shopping <FiArrowRight />
              </Link>
              <Link to="/cart" className="btn-outline border-white/20 bg-white/10 px-6 py-3 text-white hover:bg-white/15">
                View Cart
              </Link>
            </div>
          </div>
          {heroImages.length > 0 && (
            <div className="hidden rounded-lg border border-white/10 bg-white/10 p-4 backdrop-blur lg:block">
              <div className="grid grid-cols-2 gap-3">
                {heroImages.map((product) => (
                  <img key={product._id} src={product.image} alt={product.name} className="aspect-square rounded-lg object-cover" />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-4 py-8 sm:px-6 md:grid-cols-3">
        {[
          { icon: FiTruck, title: 'Fast delivery', copy: 'Order data goes to backend' },
          { icon: FiShield, title: 'Protected admin', copy: 'JWT admin routes enabled' },
          { icon: FiZap, title: 'Live catalog', copy: 'Products load from MongoDB' },
        ].map((item) => (
          <div key={item.title} className="flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-cyan-100 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300">
              <item.icon className="h-5 w-5" />
            </span>
            <div>
              <h2 className="font-bold text-slate-950 dark:text-white">{item.title}</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">{item.copy}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-600 dark:text-cyan-300">Featured</p>
            <h2 className="mt-2 text-3xl font-black text-slate-950 dark:text-white">Popular right now</h2>
          </div>
          <Link to="/products" className="hidden text-sm font-bold text-slate-700 hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-300 sm:inline-flex">
            Browse all
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="card text-slate-600 dark:text-slate-300">No products in database yet. Open Products and seed the database.</div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <Link key={product._id} to={`/products/${product._id}`} className="group overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                  <img src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                </div>
                <div className="p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-cyan-600 dark:text-cyan-300">{product.category}</p>
                  <h3 className="mt-2 font-bold text-slate-950 dark:text-white">{product.name}</h3>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{product.brand}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-black text-slate-950 dark:text-white">{formatCurrency(product.price)}</span>
                    <span className="text-sm font-semibold text-cyan-600 dark:text-cyan-300">Details</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="mb-6">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-rose-600 dark:text-rose-300">Categories</p>
          <h2 className="mt-2 text-3xl font-black text-slate-950 dark:text-white">Shop by category</h2>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {categories.map((category) => (
            <Link key={category._id} to={`/products?category=${encodeURIComponent(category.name)}`} className="rounded-lg bg-slate-950 p-6 text-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <h3 className="text-xl font-black">{category.name}</h3>
              <p className="mt-3 text-sm leading-6 text-white/80">{category.subcategories?.length || 0} subcategories</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold">
                Explore <FiArrowRight />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
