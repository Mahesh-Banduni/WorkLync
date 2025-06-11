// src/app/dashboard/layout.jsx
'use client';

import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';

export default function DashboardLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen md:flex-row">
      {/* Sidebar - includes mobile header bar */}
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="flex flex-col flex-1 min-w-0 ">
        {/* Header - Only shows on desktop, mobile header is in Sidebar */}
        <Header />
        
        {/* Main Content */}
        <main className="flex-1 p-2 md:p-4 bg-white overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}