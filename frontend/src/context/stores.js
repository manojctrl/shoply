import { create } from 'zustand';
import { getStoredUser, getStoredToken } from '../utils/helpers';

export const useAuthStore = create((set) => ({
  user: getStoredUser(),
  token: getStoredToken(),
  isAuthenticated: !!getStoredToken(),

  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),

  login: (user, token) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    set({ user, token, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    set({ user: null, token: null, isAuthenticated: false });
  },

  isAdmin: () => {
    const state = create.getState?.();
    return state?.user?.isAdmin ?? false;
  },
}));

export const useThemeStore = create((set) => ({
  isDark: localStorage.getItem('theme') === 'dark',
  toggleTheme: () =>
    set((state) => {
      const newTheme = !state.isDark;
      localStorage.setItem('theme', newTheme ? 'dark' : 'light');
      if (newTheme) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return { isDark: newTheme };
    }),
}));

export const useLoadingStore = create((set) => ({
  isLoading: false,
  setLoading: (isLoading) => set({ isLoading }),
}));
