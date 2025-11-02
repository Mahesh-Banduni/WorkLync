'use client';

import { useDispatch, useSelector } from 'react-redux';
import { axiosInstance } from '@/lib/utils';
import {
  setCandidates,
  setLoading,
  setError,
} from '@/store/slices/candidatesSlice';
import { errorToast, successToast } from '@/components/ui/toast';

export const useCandidate = () => {
  const dispatch = useDispatch();
  const { candidatesList, loading, error } = useSelector((state) => state.candidates);

  const fetchCandidates = async () => {
    const token = localStorage.getItem("token");
    dispatch(setLoading(true));
    try {
      const response = await axiosInstance.get(`/api/candidates/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log(response.data.candidates)
      if(response.status===200){
        console.log("halo")
        dispatch(setCandidates(response.data.candidates));
      }
      else{
        dispatch(setCandidates([]));
        errorToast('Found no candidates');
        //dispatch(setError(response.error));
      }
    } catch (err) {
      dispatch(setError(err.response?.data.error || 'Failed to fetch'));
      errorToast(err.response?.data.error);
    }
    finally{
      console.log("Candidate list",candidatesList)
      dispatch(setLoading(false));
    }
  };

  const createCandidate = async (candidatesData) =>{
    const token = localStorage.getItem("token");
    dispatch(setLoading(true));
    try {
      const formData = new FormData();

      formData.append('fullName', candidatesData.fullName);
      formData.append('phoneNumber', candidatesData.phoneNumber);
      formData.append('yearsOfExperience', candidatesData.yearsOfExperience);
      formData.append('email', candidatesData.email);
      formData.append('position', candidatesData.position);

      // Append the file only if it exists
      if (candidatesData.resume) {
        formData.append('resume', candidatesData.resume);
      }

      const response = await axiosInstance.post('/api/candidates/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
      });

      console.log("Create",response)

      return response;
    } catch (error) {
      return error;
    }
  }

  const updateCandidateStatus = async (candidateId, status) =>{
    const token = localStorage.getItem("token");
    dispatch(setLoading(true));
    try {
      const response = await axiosInstance.put(`/api/candidates/${candidateId}/change-status`, {status}, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });

      console.log(response)

      return response;
    } catch (error) {
      return error;
    }
  }

  const deleteCandidate = async (candidateId) =>{
    const token = localStorage.getItem("token");
    dispatch(setLoading(true));
    try {
      const response = await axiosInstance.delete(`/api/candidates/${candidateId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });

      console.log(response)

      return response;
    } catch (error) {
      return error;
    } 
  }

  const downloadResume = async (candidateId) =>{
    const token = localStorage.getItem("token");
    dispatch(setLoading(true));
    try {
      const response = await axiosInstance.get(`/api/candidates/${candidateId}/download-resume`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });
      //console.log("Download",response);

      return response;
    } catch (error) {
      return error;
    } 
  }

  return {
    fetchCandidates,
    createCandidate,
    updateCandidateStatus,
    deleteCandidate,
    downloadResume
  };
}
