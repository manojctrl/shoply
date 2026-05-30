import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore, useCartStore } from '../context/stores';
import { ordersAPI } from '../services/api';
import { formatCurrency } from '../utils/helpers';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    phone: '',
    paymentMethod: 'Cash on Delivery',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const subtotal = items.reduce((total, item) => total + item.price * item.qty, 0);
  const shipping = subtotal > 150 || subtotal === 0 ? 0 : 10;
  const total = subtotal + shipping;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (items.length === 0) {
      setError('Your cart is empty');
      return;
    }

    setLoading(true);
    try {
      const response = await ordersAPI.create({
        orderItems: items.map((item) => ({
          name: item.name,
          qty: item.qty,
          image: item.image,
          price: item.price,
          product: item.product,
        })),
        shippingAddress: {
          address: formData.address,
          city: formData.city,
          phone: formData.phone,
        },
        paymentMethod: formData.paymentMethod,
        totalPrice: total,
      });
      clearCart();
      navigate(`/orders?created=${response.data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not place order');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-12">
        <div className="card text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Cart is empty</h1>
          <Link to="/products" className="btn-primary mt-5">Shop Products</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">Checkout</h1>
      {error && <div className="mb-5 rounded-lg bg-red-50 p-4 text-sm text-red-600">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="card">
          <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Shipping Address</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <input type="text" value={user?.name || ''} readOnly className="input" />
            <input type="email" value={user?.email || ''} readOnly className="input" />
            <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Street Address" className="input md:col-span-2" required />
            <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" className="input" required />
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="input" required />
          </div>
        </div>

        <div className="card">
          <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Payment Method</h2>
          <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} className="input">
            <option>Cash on Delivery</option>
            <option>Bank Transfer</option>
          </select>
        </div>

        <div className="card border border-primary-200 bg-primary-50 dark:border-primary-800 dark:bg-primary-950">
          <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Order Summary</h2>
          <div className="space-y-2">
            <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">Items</span><span>{items.length}</span></div>
            <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
            <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">Shipping</span><span>{shipping === 0 ? 'Free' : formatCurrency(shipping)}</span></div>
            <div className="flex justify-between border-t border-primary-200 pt-2 font-bold dark:border-primary-700"><span>Total</span><span>{formatCurrency(total)}</span></div>
          </div>
        </div>

        <button disabled={loading} className="btn-primary w-full py-3 text-lg">
          {loading ? 'Placing Order...' : 'Place Order'}
        </button>
      </form>
    </div>
  );
}
