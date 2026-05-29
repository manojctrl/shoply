# Frontend Quick Start Guide

## 🚀 Get Running in 5 Minutes

### Step 1: Install Dependencies
```bash
cd frontend
npm install
```

### Step 2: Setup Environment
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Shoply
```

### Step 3: Start Development Server
```bash
npm run dev
```

Open http://localhost:5173 in your browser.

---

## 📱 Test the Application

### Client User Flow
1. Go to `/register` → Create account
2. Login with your credentials
3. Browse products on `/products`
4. Add items to `/cart`
5. Checkout from `/checkout`
6. View orders in `/account`

### Admin User Flow
1. Login with admin account
2. Access `/admin` dashboard
3. Manage:
   - `/admin/products` - Products
   - `/admin/orders` - Orders
   - `/admin/users` - Users
   - `/admin/categories` - Categories

---

## 🎨 Design & Styling

### Using Tailwind Classes
```jsx
// Buttons
<button className="btn-primary">Click Me</button>
<button className="btn-secondary">Secondary</button>
<button className="btn-danger">Danger</button>

// Inputs
<input type="text" className="input" placeholder="Enter text" />

// Cards
<div className="card">Content here</div>

// Badges
<span className="badge-success">Active</span>
<span className="badge-danger">Inactive</span>
```

### Dark Mode
```jsx
import { useThemeStore } from './context/stores';

const isDark = useThemeStore((state) => state.isDark);
const toggleTheme = useThemeStore((state) => state.toggleTheme);

<button onClick={toggleTheme}>
  {isDark ? '☀️' : '🌙'}
</button>
```

---

## 🔐 Authentication

### Login/Register
```jsx
import { authAPI } from './services/api';
import { useAuthStore } from './context/stores';

const login = useAuthStore((state) => state.login);

const handleLogin = async (email, password) => {
  const response = await authAPI.login(email, password);
  login(response.data.user, response.data.token);
};
```

### Protect Routes
```jsx
import ProtectedRoute from './components/shared/ProtectedRoute';

// Public route
<Route path="/login" element={<LoginPage />} />

// Protected route (logged in users only)
<Route path="/account" element={
  <ProtectedRoute>
    <AccountPage />
  </ProtectedRoute>
} />

// Admin only route
<Route path="/admin" element={
  <ProtectedRoute adminOnly>
    <AdminDashboard />
  </ProtectedRoute>
} />
```

---

## 🔌 API Integration

### API Endpoints
```javascript
import { 
  authAPI, 
  productsAPI, 
  ordersAPI, 
  usersAPI,
  categoriesAPI 
} from './services/api';

// Auth
await authAPI.login(email, password);
await authAPI.register(userData);

// Products
await productsAPI.getAll();
await productsAPI.getById(id);
await productsAPI.create(productData);
await productsAPI.update(id, productData);
await productsAPI.delete(id);

// Orders
await ordersAPI.getAll();
await ordersAPI.create(orderData);
```

### Add New API Endpoint
Edit `src/services/api.js`:
```javascript
export const newAPI = {
  getAll: (params) => api.get('/endpoint', { params }),
  getById: (id) => api.get(`/endpoint/${id}`),
  create: (data) => api.post('/endpoint', data),
};
```

---

## 🎯 Adding a New Page

### 1. Create Component
```jsx
// src/pages/NewPage.jsx
export default function NewPage() {
  return (
    <div className="px-6 py-12">
      <h1 className="text-3xl font-bold">My Page</h1>
    </div>
  );
}
```

### 2. Add Route
```jsx
// src/App.jsx
import NewPage from './pages/NewPage';

<Route path="/new-page" element={<NewPage />} />
```

### 3. Add Navigation
```jsx
<Link to="/new-page">My Page</Link>
```

---

## 🧩 Adding a Shared Component

### 1. Create Component
```jsx
// src/components/shared/MyComponent.jsx
export default function MyComponent({ title, children }) {
  return (
    <div className="card">
      <h2 className="font-semibold text-gray-900 dark:text-white">
        {title}
      </h2>
      {children}
    </div>
  );
}
```

### 2. Use Anywhere
```jsx
import MyComponent from '../components/shared/MyComponent';

<MyComponent title="Hello">
  <p>Content here</p>
</MyComponent>
```

---

## 🎨 Using the Design System

### Colors
```jsx
// Tailwind color classes
<div className="text-primary-500">Primary text</div>
<div className="bg-secondary-500">Secondary background</div>
<div className="border border-gray-300 dark:border-gray-700">Border</div>
```

### Responsive Design
```jsx
// Mobile-first responsive
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {/* 1 column mobile, 2 tablets, 4 desktop */}
</div>
```

### Spacing
```jsx
<div className="p-6">Padding</div>
<div className="m-4">Margin</div>
<div className="space-y-4">Items with gap</div>
```

---

## 🔄 State Management

### Auth State
```javascript
import { useAuthStore } from './context/stores';

// In component
const user = useAuthStore((state) => state.user);
const isAdmin = user?.isAdmin;

// Login
const login = useAuthStore((state) => state.login);
login(userData, token);

// Logout
const logout = useAuthStore((state) => state.logout);
logout();
```

### Theme State
```javascript
import { useThemeStore } from './context/stores';

const isDark = useThemeStore((state) => state.isDark);
const toggleTheme = useThemeStore((state) => state.toggleTheme);
```

---

## 🧪 Testing

### Test Login Flow
```
1. Go to http://localhost:5173/login
2. Enter test credentials
3. Should redirect to home or admin
4. Token saved in localStorage
```

### Test Routes
```
Public: /login, /register, /, /products, /products/:id
Client: /cart, /checkout, /account, /orders
Admin: /admin, /admin/products, /admin/orders, /admin/users
```

### Test Dark Mode
- Click theme toggle (☀️/🌙) in header
- Preference saved in localStorage
- Page should refresh with dark mode

---

## 🐛 Common Issues

### Issue: App not loading
**Solution**: Check browser console for errors

### Issue: API calls failing
**Solution**: Verify `VITE_API_URL` in `.env.local` and backend is running

### Issue: Auth not persisting
**Solution**: Check localStorage is enabled, verify token format

### Issue: Styles not applying
**Solution**: Clear browser cache, rebuild with `npm run build`

### Issue: Routes not working
**Solution**: Check route path in App.jsx matches your component path

---

## 📚 Project Structure Reference

```
frontend/
├── src/
│   ├── components/shared/    # Reusable components
│   ├── features/            # Feature modules
│   ├── pages/               # Page components
│   ├── layouts/             # Layout wrappers
│   ├── context/             # State stores
│   ├── services/            # API client
│   ├── utils/               # Helpers
│   ├── styles/              # Global CSS
│   ├── App.jsx              # Main routes
│   └── main.jsx             # Entry point
├── public/                   # Static files
├── package.json             # Dependencies
├── vite.config.js           # Build config
└── tailwind.config.js       # Design tokens
```

---

## 📖 Documentation

- **Full Guide**: Read [frontend/README.md](../frontend/README.md)
- **Migration**: Read [FRONTEND_MIGRATION_GUIDE.md](../FRONTEND_MIGRATION_GUIDE.md)
- **Completion**: Read [FRONTEND_REORGANIZATION_COMPLETE.md](../FRONTEND_REORGANIZATION_COMPLETE.md)

---

## 🎯 Next Steps

1. ✅ Run `npm install` and `npm run dev`
2. ✅ Test the application
3. ✅ Try creating a new page
4. ✅ Integrate real API endpoints
5. ✅ Add your custom components
6. ✅ Deploy to production

---

## ✨ Tips

- Use `console.log()` to debug state
- Check Redux DevTools extension (if installed)
- Use VS Code's Tailwind intellisense extension
- Keep components small and focused
- Reuse shared components whenever possible
- Follow the existing folder structure
- Write descriptive commit messages

---

**Happy Coding! 🚀**
