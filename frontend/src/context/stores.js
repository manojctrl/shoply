import { create } from 'zustand';
import { getStoredUser, getStoredToken } from '../utils/helpers';

export const useAuthStore = create((set, get) => ({
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

  isAdmin: () => get().user?.isAdmin ?? false,
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

const getStoredCart = () => {
  try {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  } catch {
    return [];
  }
};

const saveCart = (items) => localStorage.setItem('cart', JSON.stringify(items));

export const useCartStore = create((set, get) => ({
  items: getStoredCart(),

  addItem: (product, qty = 1) => {
    const id = product._id || product.id;
    const items = get().items;
    const existing = items.find((item) => item.product === id);
    const nextItems = existing
      ? items.map((item) =>
          item.product === id ? { ...item, qty: item.qty + qty } : item
        )
      : [
          ...items,
          {
            product: id,
            name: product.name,
            image: product.image,
            price: Number(product.price || 0),
            qty,
          },
        ];

    saveCart(nextItems);
    set({ items: nextItems });
  },

  updateQty: (product, qty) => {
    const nextItems = get().items
      .map((item) => (item.product === product ? { ...item, qty: Math.max(1, qty) } : item))
      .filter((item) => item.qty > 0);

    saveCart(nextItems);
    set({ items: nextItems });
  },

  removeItem: (product) => {
    const nextItems = get().items.filter((item) => item.product !== product);
    saveCart(nextItems);
    set({ items: nextItems });
  },

  clearCart: () => {
    localStorage.removeItem('cart');
    set({ items: [] });
  },
}));
