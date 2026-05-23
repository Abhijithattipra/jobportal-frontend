import axios from 'axios';
import useAuthStore from '../store/authStore';

const AUTH_BASE_URL = import.meta.env.VITE_AUTH_API_URL;
const JOB_BASE_URL = import.meta.env.VITE_JOB_API_URL;

export const authApi = axios.create({
  baseURL: AUTH_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const jobApi = axios.create({
  baseURL: JOB_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

jobApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

jobApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        useAuthStore.getState().logout();
        window.location.href = '/login';
        return Promise.reject(error);
      }

      try {
        const { data } = await authApi.post('/api/auth/refresh', { refreshToken });
        useAuthStore.getState().setTokens({ accessToken: data.accessToken });
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return jobApi(originalRequest);
      } catch {
        useAuthStore.getState().logout();
        window.location.href = '/login';
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);
