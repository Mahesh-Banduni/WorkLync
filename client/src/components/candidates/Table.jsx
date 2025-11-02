'use client';

import { Download, Trash2, MoreVertical, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import React from 'react';

export default function CandidateTable({ candidates, loading, error, onUpdate, onDelete, onDownload }) {
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [statusDropdownOpenId, setStatusDropdownOpenId] = useState(null);
  const statusOptions = ["New", "Scheduled", "Ongoing", "Selected", "Rejected"];

  const dropdownRef = useRef(null);

  // Handle clicks outside dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdownId(null);
        setStatusDropdownOpenId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Toggle functions with proper event handling
  const toggleActionDropdown = (candidateId, e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenDropdownId(prev => prev === candidateId ? null : candidateId);
    setStatusDropdownOpenId(null);
  };

  const toggleStatusDropdown = (candidateId, e) => {
    e.preventDefault();
    e.stopPropagation();
    setStatusDropdownOpenId(prev => prev === candidateId ? null : candidateId);
    setOpenDropdownId(null);
  };

  const handleStatusChange = (candidateId, newStatus, e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(`Updating ${candidateId} to ${newStatus}`);
    onUpdate(candidateId, newStatus);
    setStatusDropdownOpenId(null);
  };

  const handleResumeDownload = (candidateId, e) => {
    e.preventDefault();
    e.stopPropagation();
    onDownload(candidateId);
    setOpenDropdownId(null);
  };

  const handleCandidateDelete = (candidateId, e) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete(candidateId);
    setOpenDropdownId(null);
  };

  const getStatusColor = (status) => {
    const colors = {
      'New': 'bg-white text-blue-800',
      'Selected': 'bg-white text-purple-900',
      'Rejected': 'bg-white text-red-800',
      'Scheduled': 'bg-white text-yellow-800',
      'Ongoing': 'bg-white text-green-700'
    };
    return colors[status] || 'bg-white text-gray-800';
  };

  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm" ref={dropdownRef}>
      {/* Desktop Table */}
      <table className="hidden md:table w-full divide-y divide-gray-200">
        <thead className="bg-purple-900 h-13">
          <tr>
            <TableHeader>Sr no.</TableHeader>
            <TableHeader>Candidate Name</TableHeader>
            <TableHeader>Email Address</TableHeader>
            <TableHeader>Phone Number</TableHeader>
            <TableHeader>Position</TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader>Experience</TableHeader>
            <TableHeader>Action</TableHeader>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {candidates.map((candidate, index) => (
            <tr key={candidate.candidateId}>
              <TableCell>{index + 1}</TableCell>
              <TableCell className="font-medium">{candidate.name}</TableCell>
              <TableCell>{candidate.email}</TableCell>
              <TableCell>{candidate.phoneNumber}</TableCell>
              <TableCell>{candidate.position}</TableCell>
              <td className="px-3.5 py-4 whitespace-nowrap">
                <StatusDropdown
                  candidate={candidate}
                  statusDropdownOpenId={statusDropdownOpenId}
                  toggleStatusDropdown={toggleStatusDropdown}
                  handleStatusChange={handleStatusChange}
                  getStatusColor={getStatusColor}
                  statusOptions={statusOptions}
                />
              </td>
              <TableCell>{candidate.yearsOfExperience}</TableCell>
              <td className="px-3.5 py-4 whitespace-nowrap text-sm text-gray-500 relative">
                <ActionDropdown
                  candidate={candidate}
                  openDropdownId={openDropdownId}
                  toggleActionDropdown={toggleActionDropdown}
                  handleResumeDownload={handleResumeDownload}
                  handleCandidateDelete={handleCandidateDelete}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile View */}
      <div className="md:hidden space-y-4 p-4">
        {candidates.map((candidate) => (
          <div key={candidate.candidateId} className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <div className="flex flex-wrap justify-between items-start gap-1.5">
              <div>
                <p className="text-sm font-medium text-gray-900">{candidate.name}</p>
                <p className="text-xs text-gray-500 break-all">{candidate.email}</p>
              </div>
              <div className="relative">
                <StatusDropdown
                  candidate={candidate}
                  statusDropdownOpenId={statusDropdownOpenId}
                  toggleStatusDropdown={toggleStatusDropdown}
                  handleStatusChange={handleStatusChange}
                  getStatusColor={getStatusColor}
                  statusOptions={statusOptions}
                />
              </div>
            </div>
            
            <div className="mt-3 flex-wrap flex gap-5 text-sm items-center justify-between">
              <div className='flex-wrap flex gap-5'>
                <div>
                  <p className="text-gray-500">Phone</p>
                  <p>{candidate.phoneNumber}</p>
                </div>
                <div>
                  <p className="text-gray-500">Position</p>
                  <p>{candidate.position}</p>
                </div>
                <div>
                  <p className="text-gray-500">Experience</p>
                  <p>{candidate.yearsOfExperience}</p>
                </div>
              </div>
              <div className="flex items-end justify-between relative">
                <ActionDropdown
                  candidate={candidate}
                  openDropdownId={openDropdownId}
                  toggleActionDropdown={toggleActionDropdown}
                  handleResumeDownload={handleResumeDownload}
                  handleCandidateDelete={handleCandidateDelete}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Component Parts
const LoadingState = () => (
  <div className="flex flex-col items-center justify-center py-20 space-y-3">
    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-900"></div>
    <p className="text-sm text-gray-600">Loading candidates...</p>
  </div>
);

const ErrorState = ({ error }) => (
  <div className="text-center py-10 text-red-600 font-medium">
    {error}
  </div>
);

const TableHeader = ({ children }) => (
  <th className="px-3.5 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
    {children}
  </th>
);

const TableCell = ({ children, className = '' }) => (
  <td className={`px-3.5 py-4 whitespace-nowrap text-sm text-gray-500 ${className}`}>
    {children}
  </td>
);

const StatusDropdown = ({
  candidate,
  statusDropdownOpenId,
  toggleStatusDropdown,
  handleStatusChange,
  getStatusColor,
  statusOptions
}) => (
  <div className="relative">
    <button
      onClick={(e) => toggleStatusDropdown(candidate.candidateId, e)}
      className={`flex items-center justify-between px-3 py-2 h-8 rounded-full border-1 border-purple-900 ${getStatusColor(candidate.applicationStatus)}`}
    >
      <span className="text-sm font-semibold">{candidate.applicationStatus}</span>
      <ChevronDown className={`w-3 h-3 ml-1 transition-transform ${statusDropdownOpenId === candidate.candidateId ? 'rotate-180' : ''}`} />
    </button>
    {statusDropdownOpenId === candidate.candidateId && (
      <div 
        className="absolute z-20 mt-1 left-0 bg-white border rounded-lg shadow-lg w-32"
        onClick={(e) => e.stopPropagation()}
      >
        {statusOptions.map(option => (
          <div
            key={option}
            onClick={(e) => handleStatusChange(candidate.candidateId, option, e)}
            className="px-3 py-2 text-xs hover:bg-gray-100 cursor-pointer"
          >
            {option}
          </div>
        ))}
      </div>
    )}
  </div>
);

const ActionDropdown = ({ 
  candidate, 
  openDropdownId, 
  toggleActionDropdown, 
  handleResumeDownload, 
  handleCandidateDelete 
}) => (
  <>
    <button 
      onClick={(e) => toggleActionDropdown(candidate.candidateId, e)}
      className="text-gray-600 hover:text-gray-900 p-1"
    >
      <MoreVertical className="w-4 h-4" />
    </button>
    {openDropdownId === candidate.candidateId && (
      <div 
        className="absolute z-20 right-0 mt-1 bg-white border rounded-lg shadow-lg w-40"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={(e) => handleResumeDownload(candidate.candidateId, e)}
          className="flex items-center w-full px-3 py-2 text-left text-xs hover:bg-gray-100"
        >
          <Download className="w-4 h-4 mr-2" />
          Download Resume
        </button>
        <button
          onClick={(e) => handleCandidateDelete(candidate.candidateId, e)}
          className="flex items-center w-full px-3 py-2 text-left text-xs hover:bg-gray-100 text-red-600"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete Candidate
        </button>
      </div>
    )}
  </>
);