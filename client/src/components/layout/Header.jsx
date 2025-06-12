'use client';

import { MailPlus, Bell, UserCircle, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  
  const getPageTitle = () => {
    if (!pathname) return 'Dashboard';
    
    const segments = pathname.split('/').filter(Boolean);
    const lastSegment = segments.pop();
    
    if (!lastSegment) return 'Dashboard';
    
    switch(lastSegment) {
      case 'candidates': return 'Candidates';
      case 'employees': return 'Employees';
      case 'attendance': return 'Attendance';
      case 'leaves': return 'Leaves';
      case 'dashboard': return 'Dashboard';
      default: return 'Dashboard';
    }
  };

  return (
    <div className="hidden md:flex w-full h-16 items-center justify-between px-6 border-b sticky top-0 bg-white z-30">
      <div className="flex items-center gap-4">
        <p className="text-lg font-medium text-gray-800">{getPageTitle()}</p>
      </div>
      
      <div className="flex items-center gap-2">
        <button className="p-2 hover:bg-gray-100 rounded-md transition-colors">
          <MailPlus className="w-5 h-5 text-gray-800" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-md transition-colors">
          <Bell className="w-5 h-5 text-gray-800" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-md transition-colors flex items-center gap-1">
          <UserCircle className="w-5 h-5 text-gray-800" />
          <ChevronDown className="w-3 h-3 text-gray-800" />
        </button>
      </div>
    </div>
  );
}