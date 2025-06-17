import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"
import axios from "axios";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Add interceptors if needed
axiosInstance.interceptors.request.use(
  (config) => {
    // Modify request config before sending, like adding auth token
    const token = localStorage.getItem("token"); // Example token

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally (optional)
    if (error.response && error.response.status === 401) {
      // Handle unauthorized errors, like redirecting to login
      // e.g., logoutUser();
    }
    return Promise.reject(error);
  }
);

