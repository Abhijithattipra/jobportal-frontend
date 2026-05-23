import { create } from 'zustand';

const getStoredState = () => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  return {
    accessToken,
    refreshToken,
    isAuthenticated: !!accessToken,
  };
};

const useAuthStore = create((set) => ({
  ...getStoredState(),

  login: ({ accessToken, refreshToken }) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    set({ accessToken, refreshToken, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    set({ accessToken: null, refreshToken: null, isAuthenticated: false });
  },

  setTokens: ({ accessToken, refreshToken }) => {
    if (accessToken) localStorage.setItem('accessToken', accessToken);
    if (refreshToken) localStorage.setItem('refreshToken', refreshToken);
    set((state) => ({
      accessToken: accessToken || state.accessToken,
      refreshToken: refreshToken || state.refreshToken,
      isAuthenticated: true,
    }));
  },
}));

export default useAuthStore;
