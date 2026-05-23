import { authApi } from './axios';

export const registerUser = (data) =>
  authApi.post('/api/auth/register', data);

export const loginUser = (data) =>
  authApi.post('/api/auth/login', data);

export const logoutUser = (token) =>
  authApi.post('/api/auth/logout', null, {
    headers: { Authorization: `Bearer ${token}` },
  });
