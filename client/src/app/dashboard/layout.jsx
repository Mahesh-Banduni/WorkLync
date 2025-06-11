// src/app/dashboard/layout.jsx
'use client';

import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Sidebar */}
      <Sidebar />

      <div className='flex flex-col w-3/4'>
      {/* Main Content Wrapper */}
        {/* Header */}
        <Header />

        {/* Page Content */}
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
}
