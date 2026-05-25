import axios from 'axios';

const rawApiUrl = import.meta.env.VITE_API_URL?.trim();

export const API_BASE_URL = rawApiUrl
  ? rawApiUrl.replace(/\/$/, '')
  : '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add a request interceptor to attach the token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
