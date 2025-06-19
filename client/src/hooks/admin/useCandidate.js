'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { axiosInstance } from '@/lib/utils';
import {
  setCandidates,
  setLoading,
  setError,
} from '@/store/slices/candidatesSlice';
import { errorToast, successToast } from '@/components/ui/toast';

export const fetchCandidates = () => {
  const dispatch = useDispatch();
  const { candidatesList, loading, error } = useSelector((state) => state.candidates);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(setCandidates());
        const response = await axiosInstance.get('/api/candidates');
        dispatch(setLoading(response.data));
      } catch (err) {
        dispatch(setError(err.response?.data || 'Failed to fetch'));
        errorToast('Error fetching candidates');
      }
    };

    fetchData();
  }, [dispatch]);

  return { candidatesList, loading, error };
};

export const createCandidate = async (candidatesData) =>{
  try {
    const formData = new FormData();
    formData.append('candidatesData', JSON.stringify(candidatesData));
    formData.append('resume', candidatesData.resume);

    const response = await axiosInstance.post('/api/candidates/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    return error;
  }
}
