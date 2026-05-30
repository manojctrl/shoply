import React from 'react';
import { FiMinus, FiPlus, FiShield, FiTrash2, FiTruck } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useCartStore } from '../context/stores';
import { formatCurrency } from '../utils/helpers';

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const updateQty = useCartStore((state) => state.updateQty);
  const removeItem = useCartStore((state) => state.removeItem);
  const subtotal = items.reduce((total, item) => total + item.price * item.qty, 0);
  const shipping = subtotal > 150 || subtotal === 0 ? 0 : 10;
  const tax = subtotal * 0.0825;
  const total = subtotal + shipping + tax;

  return (
    <div className="bg-slate-50 px-4 py-10 dark:bg-slate-950 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-600 dark:text-cyan-300">Your bag</p>
          <h1 className="mt-2 text-4xl font-black text-slate-950 dark:text-white">Shopping Cart</h1>
        </div>

        {items.length === 0 ? (
          <div className="card text-center">
            <h2 className="text-xl font-bold text-slate-950 dark:text-white">Your cart is empty</h2>
            <Link to="/products" className="btn-primary mt-5">Shop Products</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px]">
            <div className="space-y-4">
              {items.map((item) => (
                <article key={item.product} className="grid gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:grid-cols-[120px_1fr_auto]">
                  <img src={item.image} alt={item.name} className="aspect-square w-full rounded-lg object-cover sm:w-[120px]" />
                  <div>
                    <h2 className="font-bold text-slate-950 dark:text-white">{item.name}</h2>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Product ID: {item.product}</p>
                    <button onClick={() => removeItem(item.product)} className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-rose-600 hover:text-rose-700">
                      <FiTrash2 /> Remove
                    </button>
                  </div>
                  <div className="flex items-center justify-between gap-5 sm:flex-col sm:items-end">
                    <span className="text-lg font-black text-slate-950 dark:text-white">{formatCurrency(item.price * item.qty)}</span>
                    <div className="inline-flex items-center rounded-lg border border-slate-200 bg-white p-1 dark:border-slate-700 dark:bg-slate-950">
                      <button onClick={() => updateQty(item.product, item.qty - 1)} className="flex h-9 w-9 items-center justify-center rounded-md hover:bg-slate-100 dark:hover:bg-slate-800" aria-label={`Decrease ${item.name}`}>
                        <FiMinus />
                      </button>
                      <input type="number" value={item.qty} readOnly className="h-9 w-12 border-0 bg-transparent text-center font-bold text-slate-950 focus:ring-0 dark:text-white" />
                      <button onClick={() => updateQty(item.product, item.qty + 1)} className="flex h-9 w-9 items-center justify-center rounded-md hover:bg-slate-100 dark:hover:bg-slate-800" aria-label={`Increase ${item.name}`}>
                        <FiPlus />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <aside className="h-fit rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-xl font-black text-slate-950 dark:text-white">Order Summary</h2>
              <div className="mt-5 space-y-3 border-b border-slate-200 pb-5 text-sm dark:border-slate-800">
                <div className="flex justify-between text-slate-600 dark:text-slate-400"><span>Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400"><span>Shipping</span><span>{shipping === 0 ? 'Free' : formatCurrency(shipping)}</span></div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400"><span>Estimated tax</span><span>{formatCurrency(tax)}</span></div>
              </div>
              <div className="mt-5 flex justify-between text-xl font-black text-slate-950 dark:text-white">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
              <Link to="/checkout" className="btn-primary mt-6 w-full py-3">Proceed to Checkout</Link>
              <div className="mt-5 space-y-3 rounded-lg bg-slate-50 p-4 text-sm text-slate-600 dark:bg-slate-950 dark:text-slate-400">
                <p className="flex items-center gap-2"><FiShield className="text-emerald-500" /> Order will be saved to backend</p>
                <p className="flex items-center gap-2"><FiTruck className="text-cyan-500" /> Free shipping over $150</p>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
