'use client';

import { ChevronDown, Search } from "lucide-react";
import { useState } from "react";
import EmployeesTable from "@/components/employees/EmployeesTable";

export default function Employees() {
  const [positionOpen, setPositionOpen] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState("Position");
  const positionOptions = ["Designer", "Developer", "Human Resource"];

  return (
    <div className="max-w-screen-xl mx-auto">
      
      {/* Filter Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-3 items-center justify-between">

        {/* Position Dropdown */}
        <div className="relative">
          <button
            onClick={() => setPositionOpen(!positionOpen)}
            className="flex items-center justify-between w-full md:w-48 px-4 py-2 border rounded-full bg-white hover:bg-gray-50 transition-colors"
          >
            <span>{selectedPosition}</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${positionOpen ? 'transform rotate-180' : ''}`} />
          </button>
          {positionOpen && (
            <div className="absolute z-10 mt-1 w-full md:w-48 bg-white border rounded-lg shadow-lg">
              {positionOptions.map((option) => (
                <div
                  key={option}
                  onClick={() => {
                    setSelectedPosition(option);
                    setPositionOpen(false);
                  }}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="flex items-center h-9 px-4 mt-0.5">
          <div className="relative w-full ">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Search"
              className="w-full text-md pl-10 pr-4 bg-white py-1.5 border-2 border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
        </div>

      </div>

      {/* Employees List */}
      <div className="bg-white rounded-lg border">
        <EmployeesTable />
      </div>
    </div>
  );
}