"use client";
import { useState, useEffect, useRef } from "react";
import { BarChart, Sparkle, Search, Square, User, LogOut, Menu } from "lucide-react";
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
      {/* Mobile Toggle Button */}
      <div className="md:hidden flex items-center p-4 border-b">
        <button onClick={() => setIsOpen(!isOpen)}>
          <Menu className="w-6 h-6 text-purple-800" />
        </button>
        <div className="flex items-center gap-2 px-4">
          <Square className="text-purple-800 w-5 h-5 font-bold" />
          <h1 className="text-xl font-bold text-purple-800">WorkLync</h1>
        </div>
      </div>

      {/* Sidebar */}
      <div
       ref={sidebarRef}
       className={`
         ${isOpen ? "block" : "hidden"} 
         md:block 
         fixed md:relative 
         top-0 left-0 
         h-screen w-64 
         bg-white border-r-2 z-40 
         transition-transform
       `}
      >

        <div className="flex items-center gap-2 h-20 px-4 ">
          <Square className="text-purple-800 w-6 h-6 font-bold" />
          <h1 className="text-2xl font-bold text-purple-800">WorkLync</h1>
        </div>

        <div className="flex items-center h-15 px-4">
          <div className="relative w-full">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Search"
              className="w-full text-md pl-10 pr-4 py-1 border-2 border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
        </div>

        <div className="flex flex-col ml-4 mt-5 gap-4 text-sm">
          <div>
            <p className="font-light text-gray-600">Recruitment</p>
            <div className="inline-flex gap-2 items-center ml-3 mt-5">
              <Link href="/dashboard/candidates" className="flex items-center gap-2 text-black hover:text-purple-800">
                <User className="w-4 h-4" />
                Candidates
              </Link>
            </div>
          </div>

          <div>
            <p className="font-light text-gray-600 mt-2">Organization</p>
            <div className="ml-3 mt-5 flex flex-col gap-5">
              <div className="inline-flex gap-2">
                <Link href="/dashboard/candidates" className="flex items-center gap-2 text-black hover:text-purple-800">
                  <User className="w-4 h-4" />
                    Employees
                </Link>
              </div>
              <div className="inline-flex gap-2">
                <Link href ="/dashboard/candidates" className="flex items-center gap-2 text-black hover:text-purple-800">
                  <BarChart className="w-4 h-4" />
                   Attendance
                </Link>
              </div>
              <div className="inline-flex gap-2">
                <Link href ="/dashboard/candidates" className="flex items-center gap-2 text-black hover:text-purple-800">
                  <Sparkle className="w-5 h-5" />
                    Leaves
                </Link>
              </div>
            </div>
          </div>

          <div>
            <p className="font-light text-gray-600 mt-2">Others</p>
            <div className="inline-flex gap-2 items-center ml-3 mt-5">
              <LogOut className="w-4 h-4" />
              <button>Logout</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
