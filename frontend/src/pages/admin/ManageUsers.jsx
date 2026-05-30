import React, { useEffect, useState } from 'react';
import { usersAPI } from '../../services/api';
import { formatDate } from '../../utils/helpers';

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const loadUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await usersAPI.getAll();
      setUsers(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleToggleAdmin = async (id) => {
    try {
      await usersAPI.toggleAdmin(id);
      await loadUsers();
    } catch (err) {
      setError(err.response?.data?.message || 'Could not update user role');
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Users</h1>
      {error && <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">{error}</div>}

      <div className="card overflow-x-auto">
        {loading ? (
          <p>Loading users...</p>
        ) : (
          <table className="w-full min-w-[720px]">
            <thead className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">Name</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Email</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Role</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Joined</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="px-4 py-4 text-sm font-medium">{user.name}</td>
                  <td className="px-4 py-4 text-sm">{user.email}</td>
                  <td className="px-4 py-4 text-sm">
                    <span className={`badge ${user.isAdmin ? 'badge-danger' : 'badge-info'}`}>
                      {user.isAdmin ? 'Admin' : 'Customer'}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm">{user.createdAt ? formatDate(user.createdAt) : '-'}</td>
                  <td className="px-4 py-4 text-sm">
                    <button onClick={() => handleToggleAdmin(user._id)} className="text-primary-500 hover:text-primary-700">
                      {user.isAdmin ? 'Make Customer' : 'Make Admin'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Delete/update user backend endpoints are not available yet, so this page connects list and admin toggle only.
      </p>
    </div>
  );
}
