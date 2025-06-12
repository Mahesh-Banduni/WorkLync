<<<<<<< HEAD
'use client';

import { ChevronDown, Search } from "lucide-react";
import { useState } from "react";
import AttendanceTable from "@/components/attendance/AttendanceTable";

export default function Attendance() {
  const [statusOpen, setStatusOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("Status");

  const statusOptions = ["Present", "Absent", "Medical Leave", "Work from Home"];

  return (
    <div className="max-w-screen-xl mx-auto">
      
      {/* Filter Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-3 items-center justify-between">

        {/* Status Dropdown */}
        <div className="relative">
          <button
            onClick={() => setStatusOpen(!statusOpen)}
            className="flex items-center justify-between w-full md:w-48 px-4 py-2 border rounded-full bg-white hover:bg-gray-50 transition-colors"
          >
            <span>{selectedStatus}</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${statusOpen ? 'transform rotate-180' : ''}`} />
          </button>
          {statusOpen && (
            <div className="absolute z-10 mt-1 w-full md:w-48 bg-white border rounded-lg shadow-lg">
              {statusOptions.map((option) => (
                <div
                  key={option}
                  onClick={() => {
                    setSelectedStatus(option);
                    setStatusOpen(false);
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

      {/* Candidate List */}
      <div className="bg-white rounded-lg border">
              <AttendanceTable></AttendanceTable>
            </div>
    </div>
  );
=======
'use client';

import { ChevronDown, Search } from "lucide-react";
import { useState } from "react";
import CandidateTable from "@/components/candidates/Table";

export default function Attendance() {
  const [statusOpen, setStatusOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("Status");

  const statusOptions = ["New", "Scheduled", "Ongoing", "Selected", "Rejected"];

  return (
    <div className="max-w-screen-xl mx-auto">
      
      {/* Filter Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-3 items-center justify-between">

        {/* Status Dropdown */}
        <div className="relative">
          <button
            onClick={() => setStatusOpen(!statusOpen)}
            className="flex items-center justify-between w-full md:w-48 px-4 py-2 border rounded-full bg-white hover:bg-gray-50 transition-colors"
          >
            <span>{selectedStatus}</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${statusOpen ? 'transform rotate-180' : ''}`} />
          </button>
          {statusOpen && (
            <div className="absolute z-10 mt-1 w-full md:w-48 bg-white border rounded-lg shadow-lg">
              {statusOptions.map((option) => (
                <div
                  key={option}
                  onClick={() => {
                    setSelectedStatus(option);
                    setStatusOpen(false);
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

      {/* Candidate List */}
      <div className="bg-white rounded-lg border">
              <CandidateTable />
            </div>
    </div>
  );
>>>>>>> 3f05e7b904fc7b182cb9366149392b4195cc4a31
}