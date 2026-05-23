import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser, logoutUser } from '../api/authApi';
import useAuthStore from '../store/authStore';

export default function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login: storeLogin, logout: storeLogout, accessToken } = useAuthStore();

  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await loginUser(credentials);
      storeLogin({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      });
      navigate('/dashboard');
    } catch (err) {
      setError(
        err.response?.data?.message || 'Invalid email or password'
      );
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      await registerUser(userData);
      navigate('/login', { state: { registered: true } });
    } catch (err) {
      setError(
        err.response?.data?.message || 'Registration failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await logoutUser(accessToken);
    } catch {
      // Logout even if API fails
    } finally {
      storeLogout();
      setLoading(false);
      navigate('/login');
    }
  };

  return { login, register, logout, loading, error, setError };
}
