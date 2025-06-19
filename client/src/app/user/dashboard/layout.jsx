'use client';

import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRoleCheck } from '@/hooks/useAuth';
import { Square } from 'lucide-react';

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkRole = async () => {
      try {
        const role = await useRoleCheck();
        if (role === 'USER') {
          setIsChecking(false);
        } else {
          router.push('/');
        }
      } catch (error) {
        router.push('/');
      }
    };

    checkRole();
  }, [router]);

  if (isChecking) {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 space-y-4">
      <div className="flex items-center space-x-3 animate-pulse">
        <Square className="text-purple-900 w-10 h-10" />
        <h1 className="text-3xl font-bold text-purple-900">WorkLync</h1>
      </div>
    </div>
   );
  }
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