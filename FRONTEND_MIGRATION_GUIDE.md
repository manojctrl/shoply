# Frontend Migration Guide

## What Changed?

The frontend has been completely restructured and modernized:

### Before (Separate Apps)
```
frontend/
├── admin/          # Separate admin app
├── client/         # Separate client app
```

### After (Unified App)
```
frontend/
├── src/
│   ├── features/
│   ├── pages/
│   ├── components/
│   ├── layouts/
│   └── ...
```

## Key Improvements

### 1. **Single Unified Application**
- One codebase instead of maintaining two separate apps
- Shared components and utilities
- Consistent styling across admin and client

### 2. **Modern Design System**
- Tailwind CSS for all styling
- Custom design tokens and color system
- Responsive design out of the box
- Dark mode support

### 3. **Improved Architecture**
- Feature-based folder structure
- Centralized API service
- Zustand for state management
- Protected route components

### 4. **Better Developer Experience**
- Consistent code patterns
- Reusable components
- Clear separation of concerns
- Comprehensive README

## Migration Checklist

### For Old Admin App
- [ ] Copy custom components to `src/components/`
- [ ] Copy admin pages to `src/pages/admin/`
- [ ] Update imports to new structure
- [ ] Replace CSS with Tailwind classes
- [ ] Test admin routes and functionality

### For Old Client App
- [ ] Copy custom components to `src/components/`
- [ ] Copy client pages to `src/pages/`
- [ ] Update imports to new structure
- [ ] Replace CSS with Tailwind classes
- [ ] Test client routes and functionality

### General Updates
- [ ] Update API endpoints in `services/api.js`
- [ ] Add new features to Zustand stores
- [ ] Update environment variables
- [ ] Run `npm install` to get new dependencies
- [ ] Test dark mode functionality
- [ ] Test responsive design on mobile devices

## Installation & Setup

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Setup Environment
```bash
# Copy example env file
cp .env.example .env.local

# Update with your API URL
VITE_API_URL=http://localhost:5000/api
```

### 3. Start Development
```bash
npm run dev
```

## Component Migration Examples

### Old Admin Navigation
```jsx
// Old
import Sidebar from './Sidebar';

function App() {
  return <Sidebar />;
}
```

### New Admin Navigation
```jsx
// New
import Sidebar from '../components/shared/Sidebar';
import AdminLayout from '../layouts/AdminLayout';

function AdminDashboard() {
  return (
    <AdminLayout>
      {/* content */}
    </AdminLayout>
  );
}
```

### Old Styling
```css
/* Old admin/style.css */
.product-card {
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
}
```

### New Styling
```jsx
// New with Tailwind
<div className="card">
  {/* content */}
</div>
```

## File Structure Reference

### Moving Old Components

**Old Admin Components** → Move to:
```
admin/Components/* → src/components/shared/
admin/Pages/*      → src/pages/admin/
```

**Old Client Components** → Move to:
```
client/Components/* → src/components/shared/
client/Pages/*      → src/pages/
```

## Important: Old Folders

The `admin/` and `client/` folders in the old structure can be kept for reference but are **no longer used**. All development should happen in the new `src/` folder.

If you want to remove the old folders after migration:
```bash
# Backup first
cp -r frontend/admin frontend/admin.backup
cp -r frontend/client frontend/client.backup

# Then delete
rm -rf frontend/admin
rm -rf frontend/client
```

## Common Issues & Solutions

### Issue: Components not rendering
**Solution**: Check import paths match new structure

### Issue: Styles not applying
**Solution**: Make sure you're using Tailwind classes, not old CSS

### Issue: API calls failing
**Solution**: Verify API URL in `.env.local` and that backend is running

### Issue: Dark mode not working
**Solution**: Ensure `useThemeStore` is properly initialized

## Testing Checklist

- [ ] Login/Register works
- [ ] Dashboard loads correctly
- [ ] Navigation works (admin and client)
- [ ] Protected routes redirect properly
- [ ] Dark mode toggles
- [ ] Responsive design works on mobile
- [ ] API calls work
- [ ] Forms submit correctly
- [ ] Error handling displays
- [ ] User data persists

## Next Steps

1. Complete the component migration
2. Update API endpoints
3. Test all routes thoroughly
4. Deploy to staging environment
5. Test with real users
6. Deploy to production

## Support

For issues or questions during migration:
- Check the main README.md for API documentation
- Review Tailwind CSS documentation
- Check Zustand documentation for state management
