# Shoply Frontend - Unified Architecture

## Overview
The frontend has been reorganized from separate Admin and Client applications into a **single unified application** with role-based routing and a modern design system using Tailwind CSS.

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   └── shared/              # Shared components
│   │       ├── Header.jsx       # Header with logo and user info
│   │       ├── Navbar.jsx       # Client navigation
│   │       ├── Footer.jsx       # Footer component
│   │       ├── AdminHeader.jsx  # Admin-specific header
│   │       ├── Sidebar.jsx      # Admin sidebar menu
│   │       └── ProtectedRoute.jsx # Auth protection wrapper
│   │
│   ├── features/                # Feature-based organization
│   │   ├── auth/               # Authentication feature
│   │   ├── products/           # Product management
│   │   ├── orders/             # Order management
│   │   ├── dashboard/          # Dashboard features
│   │   ├── admin/              # Admin-only features
│   │   └── cart/               # Shopping cart
│   │
│   ├── pages/                   # Page components
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── HomePage.jsx
│   │   ├── ProductsPage.jsx
│   │   ├── ProductDetailsPage.jsx
│   │   ├── CartPage.jsx
│   │   ├── CheckoutPage.jsx
│   │   ├── AccountPage.jsx
│   │   ├── OrdersPage.jsx
│   │   ├── AdminDashboard.jsx
│   │   └── admin/
│   │       ├── ManageProducts.jsx
│   │       ├── ManageOrders.jsx
│   │       ├── ManageUsers.jsx
│   │       └── ManageCategories.jsx
│   │
│   ├── layouts/
│   │   ├── ClientLayout.jsx     # Client layout wrapper
│   │   └── AdminLayout.jsx      # Admin layout wrapper
│   │
│   ├── context/
│   │   └── stores.js            # Zustand stores for state management
│   │
│   ├── services/
│   │   └── api.js               # API client and endpoints
│   │
│   ├── utils/
│   │   └── helpers.js           # Utility functions
│   │
│   ├── styles/
│   │   └── globals.css          # Global styles with Tailwind
│   │
│   ├── constants/               # App constants
│   │
│   ├── hooks/                   # Custom React hooks
│   │
│   ├── App.jsx                  # Main app with routing
│   └── main.jsx                 # Entry point
│
├── public/                       # Static assets
├── index.html
├── vite.config.js
├── tailwind.config.js           # Tailwind CSS configuration
├── postcss.config.js            # PostCSS configuration
├── package.json
├── .env.example                 # Environment variables template
├── eslint.config.js             # ESLint configuration
└── README.md                     # This file

```

## Design System

### Colors
- **Primary**: Sky blue (`#0ea5e9`)
- **Secondary**: Purple (`#a855f7`)
- **Success**: Green
- **Danger**: Red
- **Warning**: Yellow
- **Info**: Blue

### Components
- **Buttons**: `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-danger`
- **Inputs**: `.input`
- **Cards**: `.card`
- **Badges**: `.badge`, `.badge-success`, `.badge-danger`

### Features
- ✅ Dark mode support
- ✅ Responsive design (mobile-first)
- ✅ Tailwind CSS for styling
- ✅ Component-based architecture
- ✅ Smooth transitions and animations
- ✅ Accessible form inputs

## Getting Started

### Installation
```bash
cd frontend
npm install
```

### Development
```bash
npm run dev
```

The app will run on `http://localhost:5173`

### Build
```bash
npm run build
```

### Preview
```bash
npm run preview
```

## Routing Structure

### Public Routes
- `/` - Home page
- `/login` - Login page
- `/register` - Registration page
- `/products` - Products listing
- `/products/:id` - Product details
- `/about` - About page (placeholder)

### Client Protected Routes
- `/cart` - Shopping cart
- `/checkout` - Checkout page
- `/account` - User account settings
- `/orders` - My orders

### Admin Protected Routes
- `/admin` - Admin dashboard
- `/admin/products` - Manage products
- `/admin/orders` - Manage orders
- `/admin/users` - Manage users
- `/admin/categories` - Manage categories

## State Management

Using **Zustand** for lightweight state management:

```javascript
import { useAuthStore, useThemeStore } from './context/stores';

// Auth store
const user = useAuthStore((state) => state.user);
const login = useAuthStore((state) => state.login);

// Theme store
const isDark = useThemeStore((state) => state.isDark);
const toggleTheme = useThemeStore((state) => state.toggleTheme);
```

## API Integration

All API calls are handled through a centralized axios instance:

```javascript
import { authAPI, productsAPI, ordersAPI, usersAPI } from './services/api';

// Login
const response = await authAPI.login(email, password);

// Get products
const products = await productsAPI.getAll({ page: 1 });

// Create order
const order = await ordersAPI.create(orderData);
```

## Environment Variables

Create a `.env.local` file:

```
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Shoply
```

## Role-Based Access Control

The app uses JWT tokens and user roles for access control:

```javascript
<ProtectedRoute>
  <AccountPage />
</ProtectedRoute>

<ProtectedRoute adminOnly>
  <AdminDashboard />
</ProtectedRoute>
```

## Dark Mode

Toggle dark mode using the theme store:

```javascript
const toggleTheme = useThemeStore((state) => state.toggleTheme);
toggleTheme();
```

Dark mode preference is saved to localStorage.

## Performance Optimizations

- Code splitting with React Router
- Lazy loading of routes
- Optimized Tailwind CSS
- Efficient re-renders with Zustand

## Development Workflow

1. **Branch creation**: Create feature branches for new features
2. **Component development**: Follow component-based architecture
3. **Style with Tailwind**: Use Tailwind utilities for styling
4. **Test routing**: Ensure protected routes work correctly
5. **API integration**: Use services/api.js for all API calls
6. **State management**: Use Zustand stores for global state

## Common Tasks

### Adding a New Page
1. Create component in `pages/`
2. Add route in `App.jsx`
3. Add navigation link if needed

### Adding a New Feature
1. Create folder in `features/`
2. Create components inside
3. Import and use in pages

### Adding a New Shared Component
1. Create in `components/shared/`
2. Export from main component file
3. Import and use across app

## Troubleshooting

### Auth not persisting
- Check if localStorage is enabled
- Verify token is being stored correctly
- Check API token validation

### Styling not applying
- Clear Tailwind cache: `npm run build`
- Ensure CSS is imported in main.jsx
- Check tailwind.config.js content paths

### Routes not working
- Verify route path in App.jsx
- Check ProtectedRoute wrapper
- Ensure BrowserRouter is at root level

## Future Enhancements

- [ ] Advanced search and filtering
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Order tracking
- [ ] Admin analytics dashboard
- [ ] Email notifications
- [ ] Image upload support
- [ ] Payment integration
- [ ] Real-time notifications with WebSocket

## Dependencies

- **React**: 19.2.0
- **React Router**: 7.13.0
- **Axios**: 1.16.1
- **Tailwind CSS**: 3.4.1
- **Zustand**: 4.5.0
- **React Icons**: 5.5.0

## License

MIT
