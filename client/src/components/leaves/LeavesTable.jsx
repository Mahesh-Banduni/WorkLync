'use client';

import { Trash2, MoreVertical, Edit, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import EditEmployeeForm from '../employees/EditEmployeeForm';

export default function AttendanceTable() {
  const [attendance, setAttendance] = useState([
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      position: "Software Engineer",
      department: "IT",
      status: "Present"
    },
    {
      id: 2,
      name: "Brian Smith",
      email: "brian.smith@example.com",
      position: "HR Manager",
      department: "Human Resources",
      status: "Present"
    },
    {
      id: 3,
      name: "Carla Gomez",
      email: "carla.gomez@example.com",
      phone: "+1-555-345-6789",
      position: "Marketing Specialist",
      department: "Marketing",
      status: "Present"
    },
    {
      id: 4,
      name: "David Lee",
      email: "david.lee@example.com",
      phone: "+1-555-456-7890",
      position: "Product Manager",
      department: "Product",
      status: "Present"
    },
    {
      id: 5,
      name: "Emily Davis",
      email: "emily.davis@example.com",
      phone: "+1-555-567-8901",
      position: "Accountant",
      department: "Finance",
      status: "Present"
    },
  ]);

  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [statusDropdownOpenId, setStatusDropdownOpenId] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const statusOptions = ["Present", "Absent"];

  const handleEdit = (id) => {
    console.log("employee details edited")
  };

  const handleDelete = (id) => {
    setAttendance(attendance.filter(employee => employee.id !== id));
  };

  const handleSubmit = (formData) => {
    console.log('New Leave:', formData);
    // Add your API call or state update here
  };

  const toggleActionDropdown = (id) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  const toggleStatusDropdown = (id) => {
    setStatusDropdownOpenId(statusDropdownOpenId === id ? null : id);
    setOpenDropdownId(null); // Close action dropdown if open
  };

  const updateStatus = (id, newStatus) => {
    setAttendance(attendance.map(employee => 
      employee.id === id ? { ...employee, status: newStatus } : employee
    ));
    setStatusDropdownOpenId(null);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Present': return 'bg-white text-green-700';
      case 'Absent': return 'bg-white text-red-800';
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
            <th className="px-3.5 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Employee Name</th>
            <th className="px-3.5 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Email Address</th>
            <th className="px-3.5 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Position</th>
            <th className="px-3.5 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Department</th>
            <th className="px-3.5 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Status</th>
            <th className="px-3.5 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {attendance.map((employee, index) => (
            <tr key={employee.id}>
              <td className="px-3.5 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
              <td className="px-3.5 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{employee.name}</td>
              <td className="px-3.5 py-4 whitespace-nowrap text-sm text-gray-500">{employee.email}</td>
              <td className="px-3.5 py-4 whitespace-nowrap text-sm text-gray-500">{employee.position}</td>
              <td className="px-3.5 py-4 whitespace-nowrap text-sm text-gray-500">
                {employee.department}
              </td>
              <td className="px-3.5 py-4 whitespace-nowrap">
                <div className="relative">
                  <button
                    onClick={() => toggleStatusDropdown(employee.id)}
                    className={`flex items-center justify-between px-3 py-1 h-8 rounded-full border-1 border-purple-900 ${getStatusColor(employee.status)}`}
                  >
                    <span className="text-sm font-semibold">{employee.status}</span>
                    <ChevronDown className={`w-3 h-3 ml-1 transition-transform ${statusDropdownOpenId === employee.id ? 'transform rotate-180' : ''}`} />
                  </button>
                  {statusDropdownOpenId === employee.id && (
                    <div className="absolute z-20 mt-1 left-0 bg-white border rounded-lg shadow-lg w-32">
                      {statusOptions.map((option) => (
                        <div
                          key={option}
                          onClick={() => updateStatus(employee.id, option)}
                          className="px-3 py-2 text-xs hover:bg-gray-100 cursor-pointer"
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </td>
              <td className="px-3.5 py-4 whitespace-nowrap text-sm text-gray-500 relative">
                <button 
                  onClick={() => toggleActionDropdown(employee.id)}
                  className="text-gray-600 hover:text-gray-900 p-1"
                >
                  <MoreVertical className="w-4 h-4" />
                </button>
                {openDropdownId === employee.id && (
                  <div className="absolute z-20 right-0 mt-1 bg-white border rounded-lg shadow-lg w-40">
                    <button
                      onClick={() => setIsFormOpen(true)}
                      className="flex items-center w-full px-3 py-2 text-left text-xs hover:bg-gray-100"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(employee.id)}
                      className="flex items-center w-full px-3 py-2 text-left text-xs hover:bg-gray-100 text-red-600"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
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
        {attendance.map((employee, index) => (
          <div key={employee.id} className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-900">{employee.name}</p>
                <p className="text-xs text-gray-500">{employee.email}</p>
              </div>
            </div>
            
            <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-gray-500">Position</p>
                <p>{employee.position}</p>
              </div>
              <div>
                <p className="text-gray-500">Department</p>
                <p>{employee.department}</p>
              </div>
              <div className="relative">
                <button
                  onClick={() => toggleStatusDropdown(employee.id)}
                  className={`flex items-center justify-between px-3 py-1 rounded-full ${getStatusColor(employee.status)}`}
                >
                  <span className="text-xs font-semibold">{employee.status}</span>
                  <ChevronDown className={`w-3 h-3 ml-1 transition-transform ${statusDropdownOpenId === employee.id ? 'transform rotate-180' : ''}`} />
                </button>
                {statusDropdownOpenId === employee.id && (
                  <div className="absolute z-20 mt-1 right-0 bg-white border rounded-lg shadow-lg w-32">
                    {statusOptions.map((option) => (
                      <div
                        key={option}
                        onClick={() => updateStatus(employee.id, option)}
                        className="px-3 py-2 text-xs hover:bg-gray-100 cursor-pointer"
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="flex items-end justify-end relative">
                <button 
                  onClick={() => toggleActionDropdown(employee.id)}
                  className="text-gray-600 hover:text-gray-900 p-1"
                >
                  <MoreVertical className="w-4 h-4" />
                </button>
                {openDropdownId === employee.id && (
                  <div className="absolute z-20 top-6 right-0 bg-white border rounded-lg shadow-lg w-40">
                    <button
                      onClick={() => setIsFormOpen(true)}
                      className="flex items-center w-full px-3 py-2 text-left text-xs hover:bg-gray-100"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(employee.id)}
                      className="flex items-center w-full px-3 py-2 text-left text-xs hover:bg-gray-100 text-red-600"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <EditEmployeeForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
}