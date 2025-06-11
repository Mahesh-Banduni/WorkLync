'use client';

import { X, Upload, FileText } from 'lucide-react';
import { useState } from 'react';

const AddCandidateForm = ({ isOpen, onClose, onSubmit }) => {
  const positions = ['Designer Intern', 'Junior Developer', 'HR Associate', 'Marketing Assistant', 'Sales Representative'];
  
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    experience: '',
    email: '',
    position: '',
    resume: null,
    declaration: false
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone Number is required';
    if (!formData.experience.trim()) newErrors.experience = 'Experience is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.position) newErrors.position = 'Position is required';
    if (!formData.resume) newErrors.resume = 'Resume is required';
    if (!formData.declaration) newErrors.declaration = 'Declaration must be accepted';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-200 p-3 sm:p-4 bg-purple-900">
          <h2 className="text-lg sm:text-xl text-white font-semibold">Add New Candidate</h2>
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
          {/* Row 1: Full Name & Phone Number */}
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
          </div>

          {/* Row 2: Experience & Email */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Experience (Years)*
              </label>
              <input
                type="text"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg bg-white bg-opacity-80 backdrop-blur-sm ${
                  errors.experience ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base`}
                placeholder="0"
              />
              {errors.experience && (
                <p className="text-red-500 text-xs mt-1">{errors.experience}</p>
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

          {/* Row 3: Position & Resume */}
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
                <option value="">Select Position</option>
                {positions.map(pos => (
                  <option key={pos} value={pos}>{pos}</option>
                ))}
              </select>
              {errors.position && (
                <p className="text-red-500 text-xs mt-1">{errors.position}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Resume*
              </label>
              <div className={`border-2 border-dashed rounded-lg p-4 sm:p-6 text-center bg-white bg-opacity-60 backdrop-blur-sm ${
                errors.resume ? 'border-red-500' : 'border-gray-300'
              } hover:bg-opacity-80 transition-all cursor-pointer`}>
                <label className="cursor-pointer block">
                  <input
                    type="file"
                    name="resume"
                    onChange={handleChange}
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                  />
                  {formData.resume ? (
                    <div className="flex items-center justify-center space-x-2">
                      <FileText className="w-5 h-5 text-blue-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700 truncate max-w-[200px]">
                        {formData.resume.name}
                      </span>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="w-6 h-6 sm:w-8 sm:h-8 mx-auto text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600 font-medium">
                          Click to upload resume
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          PDF, DOC, DOCX (Max 10MB)
                        </p>
                      </div>
                    </div>
                  )}
                </label>
              </div>
              {errors.resume && (
                <p className="text-red-500 text-xs mt-1">{errors.resume}</p>
              )}
            </div>
          </div>

          {/* Declaration */}
          <div className="border-t pt-4 sm:pt-6">
            <div className="flex items-start space-x-3">
              <div className="flex items-center h-5 mt-0.5">
                <input
                  type="checkbox"
                  name="declaration"
                  checked={formData.declaration}
                  onChange={handleChange}
                  className="w-4 h-4 border-2 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 bg-white"
                />
              </div>
              <div className="flex-1">
                <label className="text-sm text-gray-700 leading-relaxed cursor-pointer">
                  I hereby declare that the above information is true to the best of my knowledge and belief
                </label>
                {errors.declaration && (
                  <p className="text-red-500 text-xs mt-1">{errors.declaration}</p>
                )}
              </div>
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
              onClick={handleSubmit}
              className="px-6 py-2.5 bg-purple-800 text-white rounded-lg hover:bg-purple-900 flex items-center justify-center transition-all text-sm sm:text-base font-medium order-1 sm:order-2"
            >
              <Upload className="w-4 h-4 mr-2" />
              Save Candidate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCandidateForm;