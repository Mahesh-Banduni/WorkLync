'use client';

import { Trash2, MoreVertical, Edit } from 'lucide-react';
import { useState } from 'react';
import EditEmployeeForm from './EditEmployeeForm';

export default function EmployeesTable() {
  const [employees, setEmployees] = useState([
{
    id: 1,
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    phone: "+1-555-123-4567",
    position: "Software Engineer",
    department: "IT",
    doj: "2022-03-15",
  },
  {
    id: 2,
    name: "Brian Smith",
    email: "brian.smith@example.com",
    phone: "+1-555-234-5678",
    position: "HR Manager",
    department: "Human Resources",
    doj: "2021-06-10",
  },
  {
    id: 3,
    name: "Carla Gomez",
    email: "carla.gomez@example.com",
    phone: "+1-555-345-6789",
    position: "Marketing Specialist",
    department: "Marketing",
    doj: "2023-01-25",
  },
  {
    id: 4,
    name: "David Lee",
    email: "david.lee@example.com",
    phone: "+1-555-456-7890",
    position: "Product Manager",
    department: "Product",
    doj: "2020-09-12",
  },
  {
    id: 5,
    name: "Emily Davis",
    email: "emily.davis@example.com",
    phone: "+1-555-567-8901",
    position: "Accountant",
    department: "Finance",
    doj: "2019-11-04",
  },
  ]);

  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleEdit = (id) => {
    console.log("employee details edited")
  };

  const handleDelete = (id) => {
    setEmployees(employees.filter(employee => employee.id !== id));
  };

    const handleSubmit = (formData) => {
    console.log('New candidate:', formData);
    // Add your API call or state update here
      };

  const toggleActionDropdown = (id) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
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
            <th className="px-3.5 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Phone Number</th>
            <th className="px-3.5 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Position</th>
            <th className="px-3.5 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Department</th>
            <th className="px-3.5 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Date of Joining</th>
            <th className="px-3.5 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {employees.map((employee, index) => (
            <tr key={employee.id}>
              <td className="px-3.5 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
              <td className="px-3.5 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{employee.name}</td>
              <td className="px-3.5 py-4 whitespace-nowrap text-sm text-gray-500">{employee.email}</td>
              <td className="px-3.5 py-4 whitespace-nowrap text-sm text-gray-500">{employee.phone}</td>
              <td className="px-3.5 py-4 whitespace-nowrap text-sm text-gray-500">{employee.position}</td>
              <td className="px-3.5 py-4 whitespace-nowrap text-sm text-gray-500">
                {employee.department}
              </td>
              <td className="px-3.5 py-4 whitespace-nowrap text-sm text-gray-500">
                {employee.doj}
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
        {employees.map((employee, index) => (
          <div key={employee.id} className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-900">{employee.name}</p>
                <p className="text-xs text-gray-500">{employee.email}</p>
              </div>
            </div>
            
            <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-gray-500">Phone</p>
                <p>{employee.phone}</p>
              </div>
              <div>
                <p className="text-gray-500">Position</p>
                <p>{employee.position}</p>
              </div>
              <div>
                <p className="text-gray-500">Department</p>
                <p>{employee.department}</p>
              </div>
              <div>
                <p className="text-gray-500">Date of Joining</p>
                <p>{employee.doj}</p>
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