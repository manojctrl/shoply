import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/shared/Header';
import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer';

export default function ClientLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-gray-950">
      <Header />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
