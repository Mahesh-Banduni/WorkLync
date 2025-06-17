'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { axiosInstance } from '../lib/utils';
import { successToast, errorToast } from '@/components/ui/toast';

const useLogin = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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

    const errors = validateForm();
    if (errors.length > 0) {
      errorToast(errors.join('. '));
      setLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.post('/api/auth/signin', formData);

      if (response?.status === 200) {
        localStorage.setItem('token', JSON.stringify(response?.data?.token));
        successToast('Login successful!');

        setFormData({ email: '', password: '' });

        const role = response.data?.user?.role;
        router.push(role === 'ADMIN' ? '/admin/dashboard' : '/user/dashboard');
      }
    } catch (error) {
      errorToast(error?.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    loading
  };
};

const useLogout = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);

    try {
      // Clear localStorage or cookies
      localStorage.removeItem('token');
      successToast('Logged out successfully');

      // Redirect to login page or home
      router.push('/');
    } catch (error) {
      errorToast(error?.message || 'Logout failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return {
    handleLogout,
    loading,
  };
};

export { useLogin, useLogout};
