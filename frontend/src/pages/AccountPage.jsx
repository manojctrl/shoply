import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../context/stores';

export default function AccountPage() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const [firstName = '', ...lastNameParts] = (user?.name || '').split(' ');

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">My Account</h1>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="card mb-6">
            <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Personal Information</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">First Name</label>
                  <input type="text" defaultValue={firstName} className="input" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Last Name</label>
                  <input type="text" defaultValue={lastNameParts.join(' ')} className="input" />
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                <input type="email" defaultValue={user?.email || ''} className="input" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
                <input type="tel" placeholder="Add phone number" className="input" />
              </div>
              <button className="btn-primary">Save Changes</button>
            </div>
          </div>

          <div className="card">
            <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Change Password</h2>
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Current Password</label>
                <input type="password" className="input" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">New Password</label>
                <input type="password" className="input" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm Password</label>
                <input type="password" className="input" />
              </div>
              <button className="btn-primary">Update Password</button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card">
            <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Account Stats</h2>
            <div className="space-y-3">
              <div>
                <span className="text-gray-600 dark:text-gray-400">Total Orders</span>
                <p className="text-2xl font-bold text-primary-500">12</p>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Total Spent</span>
                <p className="text-2xl font-bold text-primary-500">$1,234.56</p>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Role</span>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{user?.isAdmin ? 'Admin' : 'Customer'}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Quick Actions</h2>
            <div className="space-y-2">
              <Link to="/orders" className="btn-outline block text-center">View Orders</Link>
              <Link to="/cart" className="btn-outline block text-center">My Cart</Link>
              {user?.isAdmin && <Link to="/admin" className="btn-outline block text-center">Admin Panel</Link>}
              <button type="button" onClick={handleLogout} className="btn-danger w-full">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
