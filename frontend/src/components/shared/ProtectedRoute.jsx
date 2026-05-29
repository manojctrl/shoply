import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../context/stores';

export default function ProtectedRoute({ children, adminOnly = false }) {
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !user.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}
