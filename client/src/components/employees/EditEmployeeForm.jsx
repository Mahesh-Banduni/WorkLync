'use client';

import { X, Calendar as CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const EditEmployeeForm = ({ isOpen, onClose, onSubmit }) => {
  const positions = ['Designer Intern', 'Junior Developer', 'HR Associate', 'Marketing Assistant', 'Sales Representative'];
  
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    department: '',
    email: '',
    position: '',
    doj: null,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
    }));
  };

  const handleDateChange = (date) => {
    setFormData(prev => ({
      ...prev,
      doj: date
    }));
    if (errors.doj) {
      setErrors(prev => ({
        ...prev,
        doj: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone Number is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.department.trim()) newErrors.department = 'Department is required';
    if (!formData.position) newErrors.position = 'Position is required';
    if (!formData.doj) newErrors.doj = 'Date of Joining is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const submitData = {
        ...formData,
        doj: formData.doj ? format(formData.doj, 'yyyy-MM-dd') : null
      };
      onSubmit(submitData);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-40 flex items-center justify-center p-2 sm:p-4 bg-[#00000082] backdrop-blur-[5px] z-[9999]">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-200 p-3 sm:p-4 bg-purple-900">
          <h2 className="text-lg sm:text-xl text-white font-semibold">Edit Employee Details</h2>
          <button 
            onClick={onClose} 
            className="text-white hover:text-gray-200 transition-colors p-1"
            aria-label="Close"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Form Content */}
        <div className="p-3 sm:p-6 space-y-4 sm:space-y-6">
          {/* Row 1: Full Name & Email */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Full Name*
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg bg-white bg-opacity-80 backdrop-blur-sm ${
                  errors.fullName ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base`}
                placeholder="Jane Copper"
              />
              {errors.fullName && (
                <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Email Address*
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg bg-white bg-opacity-80 backdrop-blur-sm ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base`}
                placeholder="jane.copper@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>
          </div>

          {/* Row 2: Phone Number & Department */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Phone Number*
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg bg-white bg-opacity-80 backdrop-blur-sm ${
                  errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base`}
                placeholder="(704) 555-0127"
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Department*
              </label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg bg-white bg-opacity-80 backdrop-blur-sm ${
                  errors.department ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base`}
                placeholder="Engineering"
              />
              {errors.department && (
                <p className="text-red-500 text-xs mt-1">{errors.department}</p>
              )}
            </div>
          </div>

          {/* Row 3: Position & Date of Joining */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Position*
              </label>
              <select
                name="position"
                value={formData.position}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg bg-white bg-opacity-80 backdrop-blur-sm ${
                  errors.position ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base`}
              >
                <option value="">Select position</option>
                {positions.map((position) => (
                  <option key={position} value={position}>
                    {position}
                  </option>
                ))}
              </select>
              {errors.position && (
                <p className="text-red-500 text-xs mt-1">{errors.position}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Date of Joining*
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full p-3 justify-start text-left font-normal bg-white bg-opacity-80 backdrop-blur-sm border rounded-lg text-sm sm:text-base h-auto",
                      !formData.doj && "text-muted-foreground",
                      errors.doj ? 'border-red-500' : 'border-gray-300'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.doj ? format(formData.doj, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 z-[99999]" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.doj}
                    onSelect={handleDateChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {errors.doj && (
                <p className="text-red-500 text-xs mt-1">{errors.doj}</p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-sm sm:text-base font-medium order-2 sm:order-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="px-6 py-2.5 bg-purple-800 text-white rounded-lg hover:bg-purple-900 flex items-center justify-center transition-all text-sm sm:text-base font-medium order-1 sm:order-2"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEmployeeForm;