import React, { useState } from 'react';

export default function ManageUsers() {
  const [users] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Customer', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Admin', status: 'Active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Customer', status: 'Inactive' },
  ]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Users</h1>

      <div className="card overflow-hidden">
        <table className="w-full">
          <thead className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Role</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="px-6 py-4 text-sm text-gray-900 dark:text-white font-medium">{user.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{user.email}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`badge ${user.role === 'Admin' ? 'badge-danger' : 'badge-info'}`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <span className={`badge ${user.status === 'Active' ? 'badge-success' : 'badge-warning'}`}>
                    {user.status}
                  </span>
                </td>
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
