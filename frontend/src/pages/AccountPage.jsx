import React from 'react';

export default function AccountPage() {
  return (
    <div className="px-6 py-12 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">My Account</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="card mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Personal Information</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">First Name</label>
                  <input type="text" defaultValue="John" className="input" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Last Name</label>
                  <input type="text" defaultValue="Doe" className="input" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                <input type="email" defaultValue="john@example.com" className="input" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone</label>
                <input type="tel" defaultValue="+1234567890" className="input" />
              </div>
              <button className="btn-primary">Save Changes</button>
            </div>
          </div>

          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Change Password</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Current Password</label>
                <input type="password" className="input" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">New Password</label>
                <input type="password" className="input" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Confirm Password</label>
                <input type="password" className="input" />
              </div>
              <button className="btn-primary">Update Password</button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Account Stats</h2>
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
                <span className="text-gray-600 dark:text-gray-400">Member Since</span>
                <p className="text-sm text-gray-900 dark:text-white font-semibold">Jan 15, 2024</p>
              </div>
            </div>
          </div>

          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <a href="/orders" className="block btn-outline text-center">View Orders</a>
              <a href="/cart" className="block btn-outline text-center">My Cart</a>
              <button className="btn-danger w-full">Logout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
