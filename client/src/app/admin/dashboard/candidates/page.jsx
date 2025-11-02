'use client';

import AddCandidateForm from "@/components/candidates/AddCandidateForm";
import CandidateTable from "@/components/candidates/Table";
import { ChevronDown, Search } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { successToast, errorToast } from "@/components/ui/toast";
import {useCandidate} from "@/hooks/admin/useCandidate";
import { useSelector } from "react-redux";

export default function Candidates() {
  const { candidatesList, error, loading } = useSelector((state) => state.candidates);
  const {createCandidate, fetchCandidates, updateCandidateStatus, deleteCandidate, downloadResume} = useCandidate();

  const [statusOpen, setStatusOpen] = useState(false);
  const [positionOpen, setPositionOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("Status");
  const [selectedPosition, setSelectedPosition] = useState("Position");

  const statusOptions = ["New", "Scheduled", "Ongoing", "Selected", "Rejected"];
  const positionOptions = ["Designer", "Developer", "Human Resource"];
  const [isFormOpen, setIsFormOpen] = useState(false);

  const statusRef = useRef(null);
  const positionRef = useRef(null);
  const formRef = useRef(null);

  const handleClickOutside = (event) => {
    if (
      statusRef.current &&
      !statusRef.current.contains(event.target)
    ) {
      setStatusOpen(false);
    }

    if (
      positionRef.current &&
      !positionRef.current.contains(event.target)
    ) {
      setPositionOpen(false);
    }

    if (
      isFormOpen.current &&
      !isFormOpen.current.contains(event.target)
    ) {
      setIsFormOpen(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, []);

  const handleSubmit = async(formData) => {
    const response = await createCandidate(formData);
    console.log(response)
    if(response.status === 201){
      successToast('Candidate created successfully');
      fetchCandidates();
    }
    else if(response){
      errorToast(response?.response?.data?.error);
      fetchCandidates();
    }
    else{
      console.log("error",error)
      errorToast(error);
      fetchCandidates();
    }
  };

  const handleUpdate = async(candidateId, status) => {
    const response = await updateCandidateStatus(candidateId, status);
    if(response?.status === 200){
      successToast('Candidate status updated successfully');
      fetchCandidates();
    }
    else if(response){
      errorToast(response?.response.data.error);
      fetchCandidates();
    }
    else{
      errorToast('Failed to update candidate status');
      fetchCandidates();
    }
  };

  const handleDelete = async(candidateId) => {
    const response = await deleteCandidate(candidateId);
    if(response?.status === 200){
      successToast('Candidate deleted successfully');
      fetchCandidates();
    }
    else if(response){
      errorToast(response?.data.error);
      fetchCandidates();
    }
    else{
      errorToast('Failed to delete candidate');
      fetchCandidates();
    }
  };

  const handleResumeDownload = async(candidateId) => {
    const response = await downloadResume(candidateId);
    // console.log("download",response)
    if(response?.status === 200){
      window.open(response.data?.data?.url,'_blank');
      successToast('Resume downloaded successfully');
      fetchCandidates();
    }
    else if(response){
      errorToast(response?.data.error);
      fetchCandidates();
    }
    else{
      errorToast('Failed to download resume');
      fetchCandidates();
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto">
      
      {/* Filter Controls */}
      <div className="overflow-x-auto flex flex-col md:flex-row gap-4 mb-3 items-start justify-between">

        <div className="inline-flex gap-2">
        {/* Status Dropdown */}
        <div className="relative" ref={statusRef}>
          <button
            onClick={() => setStatusOpen(!statusOpen)}
            className="flex gap-1 items-center justify-between w-full min-w-24 lg:w-48 px-4 py-2 border rounded-full bg-white hover:bg-gray-50 transition-colors"
          >
            <span>{selectedStatus}</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${statusOpen ? 'transform rotate-180' : ''}`} />
          </button>
          {statusOpen && (
            <div className=" z-[9999] fixed inset-0 mt-1 w-full md:w-48 bg-white border rounded-lg shadow-lg">
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
        <div className="relative" ref={positionRef}>
          <button
            onClick={() => setPositionOpen(!positionOpen)}
            className="flex gap-1 items-center justify-between w-full min-w-24 lg:w-48 px-4 py-2 border rounded-full bg-white hover:bg-gray-50 transition-colors"
          >
            <span>{selectedPosition}</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${positionOpen ? 'transform rotate-180' : ''}`} />
          </button>
          {positionOpen && (
            <div className="absolute z-[9999] mt-1 w-full md:w-48 bg-white border rounded-lg shadow-lg">
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

        <div className="inline-flex gap-2 mb-1">
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
        <CandidateTable 
          candidates={candidatesList}
          loading={loading}
          error={error}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          onDownload={handleResumeDownload}
        />
      </div>

      <AddCandidateForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
}