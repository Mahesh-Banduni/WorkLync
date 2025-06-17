'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { axiosInstance } from '../lib/utils';

const useLogin = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const errors = [];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      errors.push('Please enter a valid email address');
    }

    if (formData.password.trim().length < 8) {
      errors.push('Password must be at least 8 characters long');
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    const errors = validateForm();
    if (errors.length > 0) {
      setStatus({
        type: 'error',
        message: errors.join('. ')
      });
      setLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.post('/api/auth/signin', formData);
      console.log('Login response:', response);

      if (response?.status === 200) {
        localStorage.setItem(
          'token',
          JSON.stringify(response?.data?.token?.response)
        );

        setStatus({
          type: 'success',
          message: 'Login successful!'
        });

        setFormData({ email: '', password: '' });
        router.push('/dashboard');
      }

    } catch (error) {
      setStatus({
        type: 'error',
        message: error?.response?.data?.message || 'Login failed. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    loading,
    status
  };
};

export default useLogin;
