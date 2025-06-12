'use client';

import AddCandidateForm from "@/components/candidates/AddCandidateForm";
import CandidateTable from "@/components/candidates/Table";
import { ChevronDown, Search } from "lucide-react";
import { useState } from "react";

export default function Candidates() {
  const [statusOpen, setStatusOpen] = useState(false);
  const [positionOpen, setPositionOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("Status");
  const [selectedPosition, setSelectedPosition] = useState("Position");

  const statusOptions = ["New", "Scheduled", "Ongoing", "Selected", "Rejected"];
  const positionOptions = ["Designer", "Developer", "Human Resource"];
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleSubmit = (formData) => {
    console.log('New candidate:', formData);
    // Add your API call or state update here
  };

  return (
    <div className="max-w-screen-xl mx-auto">
      
      {/* Filter Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-3 items-start justify-between">

        <div className="inline-flex gap-2">
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
        </div>

        <div div className="inline-flex gap-2">
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

        <button 
        onClick={() => setIsFormOpen(true)}
        className="text-md bg-purple-900 text-white rounded-full px-5">
          Add Candidate
        </button>

        </div>

      </div>

      {/* Candidate List */}
      <div className="bg-white rounded-lg border shadow-xl shadow-gray-200">
        <CandidateTable />
      </div>

      <AddCandidateForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
}