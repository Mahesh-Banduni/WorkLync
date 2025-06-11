import { MailPlus, Bell, UserCircle, ChevronDown,  } from "lucide-react";
import { usePathname } from "next/navigation";


export default function Header() {
  const pathname = usePathname();
  
  // Function to get page title based on current route
  const getPageTitle = () => {
    const path = pathname.split('/').pop(); // Get the last segment of the path
    
    switch(path) {
      case 'candidates':
        return 'Candidates';
      case 'employees':
        return 'Employees';
      case 'attendance':
        return 'Attendance';
      case 'leaves':
        return 'Leaves';
      case 'dashboard':
        return 'Dashboard';
      default:
        return 'Dashboard';
    }
  };

  return (
    // Only show header on desktop (md and up), completely hidden on mobile
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
        <button className="p-2 hover:bg-gray-100 rounded-md transition-colors flex-row flex items-center justify-center">
          <UserCircle className="w-5 h-5 text-gray-800" />
          <ChevronDown className="w-3 h-3 text-gray-800"></ChevronDown>
        </button>
      </div>
    </div>
  );
}