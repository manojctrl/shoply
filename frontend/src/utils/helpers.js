export const getStoredUser = () => {
  try {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

export const getStoredToken = () => localStorage.getItem('token');

export const setStoredUser = (user) => localStorage.setItem('user', JSON.stringify(user));

export const setStoredToken = (token) => localStorage.setItem('token', token);

export const clearStorage = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const isUserAdmin = () => {
  const user = getStoredUser();
  return user?.isAdmin ?? false;
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const truncateText = (text, length = 50) => {
  return text.length > length ? text.slice(0, length) + '...' : text;
};
