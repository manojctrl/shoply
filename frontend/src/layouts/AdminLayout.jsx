import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from '../components/shared/Sidebar';
import AdminHeader from '../components/shared/AdminHeader';
import { useAuthStore } from '../context/stores';

export default function AdminLayout() {
  const user = useAuthStore((state) => state.user);

  if (!user?.isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
