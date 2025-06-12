<<<<<<< HEAD
'use client';

import { Download, Trash2, MoreVertical, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function CandidateTable() {
  const [candidates, setCandidates] = useState([
    {
      id: 1,
      name: 'Jacob William',
      email: 'jacob.william@example.com',
      phone: '(252) 555-0111',
      position: 'Senior Developer',
      status: 'New',
      experience: '1+',
    },
    {
      id: 2,
      name: 'Guy Hawkins',
      email: 'kenz1.lawson@example.com',
      phone: '(907) 555-0101',
      position: 'Human Resource Lead',
      status: 'New',
      experience: '2',
    },
    {
      id: 3,
      name: 'Arlene McCoy',
      email: 'arlene.mccoy@example.com',
      phone: '(302) 555-0107',
      position: 'Full Time Designer',
      status: 'Selected',
      experience: '3',
    },
    {
      id: 4,
      name: 'Leslie Alexander',
      email: 'willie.jennings@example.com',
      phone: '(207) 555-0119',
      position: 'Full Time Developer',
      status: 'Rejected',
      experience: '0',
    },
    {
      id: 5,
      name: 'Arlene McCoy',
      email: 'arlene.mccoy@example.com',
      phone: '(302) 555-0107',
      position: 'Full Time Designer',
      status: 'Selected',
      experience: '3',
    },
    {
      id: 6,
      name: 'Leslie Alexander',
      email: 'willie.jennings@example.com',
      phone: '(207) 555-0119',
      position: 'Full Time Developer',
      status: 'Rejected',
      experience: '0',
    },
  ]);

  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [statusDropdownOpenId, setStatusDropdownOpenId] = useState(null);
  const statusOptions = ["New", "Scheduled", "Ongoing", "Selected", "Rejected"];

  const handleDelete = (id) => {
    setCandidates(candidates.filter(candidate => candidate.id !== id));
  };

  const handleDownload = (id) => {
    console.log(`Downloading resume for candidate ${id}`);
    // Add your download logic here
  };

  const toggleActionDropdown = (id) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
    setStatusDropdownOpenId(null); // Close status dropdown if open
  };

  const toggleStatusDropdown = (id) => {
    setStatusDropdownOpenId(statusDropdownOpenId === id ? null : id);
    setOpenDropdownId(null); // Close action dropdown if open
  };

  const updateStatus = (id, newStatus) => {
    setCandidates(candidates.map(candidate => 
      candidate.id === id ? { ...candidate, status: newStatus } : candidate
    ));
    setStatusDropdownOpenId(null);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'New': return 'bg-white text-blue-800';
      case 'Selected': return 'bg-white text-purple-900';
      case 'Rejected': return 'bg-white text-red-800';
      case 'Scheduled': return 'bg-white text-yellow-800';
      case 'Ongoing': return 'bg-white text-green-700';
      default: return 'bg-white text-gray-800';
    }
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      {/* Desktop Table (visible on md screens and up) */}
      <table className="hidden md:table w-full divide-y divide-gray-200">
        <thead className="bg-purple-900 h-13">
          <tr>
            <th className="px-3.5 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Sr no.</th>
            <th className="px-3.5 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Candidate Name</th>
            <th className="px-3.5 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Email Address</th>
            <th className="px-3.5 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Phone Number</th>
            <th className="px-3.5 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Position</th>
            <th className="px-3.5 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Status</th>
            <th className="px-3.5 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Experience</th>
            <th className="px-3.5 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {candidates.map((candidate, index) => (
            <tr key={candidate.id}>
              <td className="px-3.5 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
              <td className="px-3.5 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{candidate.name}</td>
              <td className="px-3.5 py-4 whitespace-nowrap text-sm text-gray-500">{candidate.email}</td>
              <td className="px-3.5 py-4 whitespace-nowrap text-sm text-gray-500">{candidate.phone}</td>
              <td className="px-3.5 py-4 whitespace-nowrap text-sm text-gray-500">{candidate.position}</td>
              <td className="px-3.5 py-4 whitespace-nowrap">
                <div className="relative">
                  <button
                    onClick={() => toggleStatusDropdown(candidate.id)}
                    className={`flex items-center justify-between px-3 py-1 h-8 rounded-full border-1 border-purple-900 ${getStatusColor(candidate.status)}`}
                  >
                    <span className="text-sm font-semibold">{candidate.status}</span>
                    <ChevronDown className={`w-3 h-3 ml-1 transition-transform ${statusDropdownOpenId === candidate.id ? 'transform rotate-180' : ''}`} />
                  </button>
                  {statusDropdownOpenId === candidate.id && (
                    <div className="absolute z-20 mt-1 left-0 bg-white border rounded-lg shadow-lg w-32">
                      {statusOptions.map((option) => (
                        <div
                          key={option}
                          onClick={() => updateStatus(candidate.id, option)}
                          className="px-3 py-2 text-xs hover:bg-gray-100 cursor-pointer"
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </td>
              <td className="px-3.5 py-4 whitespace-nowrap text-sm text-gray-500">
                {candidate.experience}
              </td>
              <td className="px-3.5 py-4 whitespace-nowrap text-sm text-gray-500 relative">
                <button 
                  onClick={() => toggleActionDropdown(candidate.id)}
                  className="text-gray-600 hover:text-gray-900 p-1"
                >
                  <MoreVertical className="w-4 h-4" />
                </button>
                {openDropdownId === candidate.id && (
                  <div className="absolute z-20 right-0 mt-1 bg-white border rounded-lg shadow-lg w-40">
                    <button
                      onClick={() => handleDownload(candidate.id)}
                      className="flex items-center w-full px-3 py-2 text-left text-xs hover:bg-gray-100"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Resume
                    </button>
                    <button
                      onClick={() => handleDelete(candidate.id)}
                      className="flex items-center w-full px-3 py-2 text-left text-xs hover:bg-gray-100 text-red-600"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Candidate
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile Cards (visible on sm screens and down) */}
      <div className="md:hidden space-y-4 p-4">
        {candidates.map((candidate, index) => (
          <div key={candidate.id} className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-900">{candidate.name}</p>
                <p className="text-xs text-gray-500">{candidate.email}</p>
              </div>
              <div className="relative">
                <button
                  onClick={() => toggleStatusDropdown(candidate.id)}
                  className={`flex items-center justify-between px-3 py-1 rounded-full ${getStatusColor(candidate.status)}`}
                >
                  <span className="text-xs font-semibold">{candidate.status}</span>
                  <ChevronDown className={`w-3 h-3 ml-1 transition-transform ${statusDropdownOpenId === candidate.id ? 'transform rotate-180' : ''}`} />
                </button>
                {statusDropdownOpenId === candidate.id && (
                  <div className="absolute z-20 mt-1 right-0 bg-white border rounded-lg shadow-lg w-32">
                    {statusOptions.map((option) => (
                      <div
                        key={option}
                        onClick={() => updateStatus(candidate.id, option)}
                        className="px-3 py-2 text-xs hover:bg-gray-100 cursor-pointer"
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-gray-500">Phone</p>
                <p>{candidate.phone}</p>
              </div>
              <div>
                <p className="text-gray-500">Position</p>
                <p>{candidate.position}</p>
              </div>
              <div>
                <p className="text-gray-500">Experience</p>
                <p>{candidate.experience}</p>
              </div>
              <div className="flex items-end justify-end relative">
                <button 
                  onClick={() => toggleActionDropdown(candidate.id)}
                  className="text-gray-600 hover:text-gray-900 p-1"
                >
                  <MoreVertical className="w-4 h-4" />
                </button>
                {openDropdownId === candidate.id && (
                  <div className="absolute z-20 top-6 right-0 bg-white border rounded-lg shadow-lg w-40">
                    <button
                      onClick={() => handleDownload(candidate.id)}
                      className="flex items-center w-full px-3 py-2 text-left text-xs hover:bg-gray-100"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Resume
                    </button>
                    <button
                      onClick={() => handleDelete(candidate.id)}
                      className="flex items-center w-full px-3 py-2 text-left text-xs hover:bg-gray-100 text-red-600"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Candidate
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
=======
'use client';

import { Download, Trash2, MoreVertical, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function CandidateTable() {
  const [candidates, setCandidates] = useState([
    {
      id: 1,
      name: 'Jacob William',
      email: 'jacob.william@example.com',
      phone: '(252) 555-0111',
      position: 'Senior Developer',
      status: 'New',
      experience: '1+',
    },
    {
      id: 2,
      name: 'Guy Hawkins',
      email: 'kenz1.lawson@example.com',
      phone: '(907) 555-0101',
      position: 'Human Resource Lead',
      status: 'New',
      experience: '2',
    },
    {
      id: 3,
      name: 'Arlene McCoy',
      email: 'arlene.mccoy@example.com',
      phone: '(302) 555-0107',
      position: 'Full Time Designer',
      status: 'Selected',
      experience: '3',
    },
    {
      id: 4,
      name: 'Leslie Alexander',
      email: 'willie.jennings@example.com',
      phone: '(207) 555-0119',
      position: 'Full Time Developer',
      status: 'Rejected',
      experience: '0',
    },
    {
      id: 5,
      name: 'Arlene McCoy',
      email: 'arlene.mccoy@example.com',
      phone: '(302) 555-0107',
      position: 'Full Time Designer',
      status: 'Selected',
      experience: '3',
    },
    {
      id: 6,
      name: 'Leslie Alexander',
      email: 'willie.jennings@example.com',
      phone: '(207) 555-0119',
      position: 'Full Time Developer',
      status: 'Rejected',
      experience: '0',
    },
  ]);

  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [statusDropdownOpenId, setStatusDropdownOpenId] = useState(null);
  const statusOptions = ["New", "Scheduled", "Ongoing", "Selected", "Rejected"];

  const handleDelete = (id) => {
    setCandidates(candidates.filter(candidate => candidate.id !== id));
  };

  const handleDownload = (id) => {
    console.log(`Downloading resume for candidate ${id}`);
    // Add your download logic here
  };

  const toggleActionDropdown = (id) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
    setStatusDropdownOpenId(null); // Close status dropdown if open
  };

  const toggleStatusDropdown = (id) => {
    setStatusDropdownOpenId(statusDropdownOpenId === id ? null : id);
    setOpenDropdownId(null); // Close action dropdown if open
  };

  const updateStatus = (id, newStatus) => {
    setCandidates(candidates.map(candidate => 
      candidate.id === id ? { ...candidate, status: newStatus } : candidate
    ));
    setStatusDropdownOpenId(null);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'New': return 'bg-white text-blue-800';
      case 'Selected': return 'bg-white text-purple-900';
      case 'Rejected': return 'bg-white text-red-800';
      case 'Scheduled': return 'bg-white text-yellow-800';
      case 'Ongoing': return 'bg-white text-green-700';
      default: return 'bg-white text-gray-800';
    }
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      {/* Desktop Table (visible on md screens and up) */}
      <table className="hidden md:table w-full divide-y divide-gray-200">
        <thead className="bg-purple-900 h-13">
          <tr>
            <th className="px-3.5 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Sr no.</th>
            <th className="px-3.5 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Candidate Name</th>
            <th className="px-3.5 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Email Address</th>
            <th className="px-3.5 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Phone Number</th>
            <th className="px-3.5 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Position</th>
            <th className="px-3.5 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Status</th>
            <th className="px-3.5 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Experience</th>
            <th className="px-3.5 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {candidates.map((candidate, index) => (
            <tr key={candidate.id}>
              <td className="px-3.5 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
              <td className="px-3.5 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{candidate.name}</td>
              <td className="px-3.5 py-4 whitespace-nowrap text-sm text-gray-500">{candidate.email}</td>
              <td className="px-3.5 py-4 whitespace-nowrap text-sm text-gray-500">{candidate.phone}</td>
              <td className="px-3.5 py-4 whitespace-nowrap text-sm text-gray-500">{candidate.position}</td>
              <td className="px-3.5 py-4 whitespace-nowrap">
                <div className="relative">
                  <button
                    onClick={() => toggleStatusDropdown(candidate.id)}
                    className={`flex items-center justify-between px-3 py-1 h-8 rounded-full border-1 border-purple-900 ${getStatusColor(candidate.status)}`}
                  >
                    <span className="text-sm font-semibold">{candidate.status}</span>
                    <ChevronDown className={`w-3 h-3 ml-1 transition-transform ${statusDropdownOpenId === candidate.id ? 'transform rotate-180' : ''}`} />
                  </button>
                  {statusDropdownOpenId === candidate.id && (
                    <div className="absolute z-20 mt-1 left-0 bg-white border rounded-lg shadow-lg w-32">
                      {statusOptions.map((option) => (
                        <div
                          key={option}
                          onClick={() => updateStatus(candidate.id, option)}
                          className="px-3 py-2 text-xs hover:bg-gray-100 cursor-pointer"
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </td>
              <td className="px-3.5 py-4 whitespace-nowrap text-sm text-gray-500">
                {candidate.experience}
              </td>
              <td className="px-3.5 py-4 whitespace-nowrap text-sm text-gray-500 relative">
                <button 
                  onClick={() => toggleActionDropdown(candidate.id)}
                  className="text-gray-600 hover:text-gray-900 p-1"
                >
                  <MoreVertical className="w-4 h-4" />
                </button>
                {openDropdownId === candidate.id && (
                  <div className="absolute z-20 right-0 mt-1 bg-white border rounded-lg shadow-lg w-40">
                    <button
                      onClick={() => handleDownload(candidate.id)}
                      className="flex items-center w-full px-3 py-2 text-left text-xs hover:bg-gray-100"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Resume
                    </button>
                    <button
                      onClick={() => handleDelete(candidate.id)}
                      className="flex items-center w-full px-3 py-2 text-left text-xs hover:bg-gray-100 text-red-600"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Candidate
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile Cards (visible on sm screens and down) */}
      <div className="md:hidden space-y-4 p-4">
        {candidates.map((candidate, index) => (
          <div key={candidate.id} className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-900">{candidate.name}</p>
                <p className="text-xs text-gray-500">{candidate.email}</p>
              </div>
              <div className="relative">
                <button
                  onClick={() => toggleStatusDropdown(candidate.id)}
                  className={`flex items-center justify-between px-3 py-1 rounded-full ${getStatusColor(candidate.status)}`}
                >
                  <span className="text-xs font-semibold">{candidate.status}</span>
                  <ChevronDown className={`w-3 h-3 ml-1 transition-transform ${statusDropdownOpenId === candidate.id ? 'transform rotate-180' : ''}`} />
                </button>
                {statusDropdownOpenId === candidate.id && (
                  <div className="absolute z-20 mt-1 right-0 bg-white border rounded-lg shadow-lg w-32">
                    {statusOptions.map((option) => (
                      <div
                        key={option}
                        onClick={() => updateStatus(candidate.id, option)}
                        className="px-3 py-2 text-xs hover:bg-gray-100 cursor-pointer"
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-gray-500">Phone</p>
                <p>{candidate.phone}</p>
              </div>
              <div>
                <p className="text-gray-500">Position</p>
                <p>{candidate.position}</p>
              </div>
              <div>
                <p className="text-gray-500">Experience</p>
                <p>{candidate.experience}</p>
              </div>
              <div className="flex items-end justify-end relative">
                <button 
                  onClick={() => toggleActionDropdown(candidate.id)}
                  className="text-gray-600 hover:text-gray-900 p-1"
                >
                  <MoreVertical className="w-4 h-4" />
                </button>
                {openDropdownId === candidate.id && (
                  <div className="absolute z-20 top-6 right-0 bg-white border rounded-lg shadow-lg w-40">
                    <button
                      onClick={() => handleDownload(candidate.id)}
                      className="flex items-center w-full px-3 py-2 text-left text-xs hover:bg-gray-100"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Resume
                    </button>
                    <button
                      onClick={() => handleDelete(candidate.id)}
                      className="flex items-center w-full px-3 py-2 text-left text-xs hover:bg-gray-100 text-red-600"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Candidate
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
>>>>>>> 3f05e7b904fc7b182cb9366149392b4195cc4a31
}