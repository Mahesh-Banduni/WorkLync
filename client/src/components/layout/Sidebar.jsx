"use client";
import { useState, useEffect, useRef } from "react";
import { BarChart, Sparkle, Search, Square, User, LogOut, Menu, MailPlus, Bell, UserCircle, ChevronDown} from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);

  // Close sidebar on outside click (mobile only)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Header Bar - Only visible on mobile */}
      <div className="md:hidden flex items-center justify-between p-4 border-b bg-white sticky top-0 z-20">
        {/* Left: Hamburger Menu */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-gray-100 rounded-md"
        >
          <Menu className="w-6 h-6 text-gray-800" />
        </button>
        
        {/* Center: Company Logo */}
        <div className="flex items-center gap-2">
          <Square className="text-purple-800 w-5 h-5 font-bold" />
          <h1 className="text-xl font-bold text-purple-800">WorkLync</h1>
        </div>
        
        {/* Right: Action Icons */}
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

      {/* Sidebar */}
      <div
       ref={sidebarRef}
       className={`
         ${isOpen ? "translate-x-0" : "-translate-x-full"} 
         md:translate-x-0
         fixed md:relative 
         top-0 left-0 
         h-screen w-64 
         bg-white border-r-2 z-40 
         transition-transform duration-300 ease-in-out
         md:block
       `}
      >
        {/* Desktop Logo - Hidden on mobile */}
        <div className="hidden md:flex items-center gap-2 h-20 px-4">
          <Square className="text-purple-800 w-6 h-6 font-bold" />
          <h1 className="text-2xl font-bold text-purple-800">WorkLync</h1>
        </div>

        {/* Mobile Logo - Only visible on mobile when sidebar is open */}
        <div className="md:hidden flex items-center gap-2 h-16 px-4 border-b">
          <Square className="text-purple-800 w-6 h-6 font-bold" />
          <h1 className="text-2xl font-bold text-purple-800">WorkLync</h1>
        </div>

        {/* Search Bar */}
        <div className="flex items-center h-15 px-4 mt-4">
          <div className="relative w-full">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Search"
              className="w-full text-md pl-10 pr-4 py-2 border-2 border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="flex flex-col ml-4 mt-6 gap-6 text-sm">
          <div>
            <p className="font-light text-gray-600 mb-3">Recruitment</p>
            <div className="ml-3">
              <Link 
                href="/dashboard/candidates" 
                className="flex items-center gap-2 text-black hover:text-purple-800 py-2"
                onClick={() => setIsOpen(false)} // Close sidebar on mobile when link clicked
              >
                <User className="w-4 h-4" />
                Candidates
              </Link>
            </div>
          </div>

          <div>
            <p className="font-light text-gray-600 mb-3">Organization</p>
            <div className="ml-3 flex flex-col gap-3">
              <Link 
                href="/dashboard/employees" 
                className="flex items-center gap-2 text-black hover:text-purple-800 py-2"
                onClick={() => setIsOpen(false)}
              >
                <User className="w-4 h-4" />
                Employees
              </Link>
              <Link 
                href="/dashboard/attendance" 
                className="flex items-center gap-2 text-black hover:text-purple-800 py-2"
                onClick={() => setIsOpen(false)}
              >
                <BarChart className="w-4 h-4" />
                Attendance
              </Link>
              <Link 
                href="/dashboard/leaves" 
                className="flex items-center gap-2 text-black hover:text-purple-800 py-2"
                onClick={() => setIsOpen(false)}
              >
                <Sparkle className="w-5 h-5" />
                Leaves
              </Link>
            </div>
          </div>

          <div>
            <p className="font-light text-gray-600 mb-3">Others</p>
            <div className="ml-3">
              <button className="flex items-center gap-2 text-black hover:text-purple-800 py-2">
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}