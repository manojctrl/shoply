# Shoply Backend API

MERN Stack E-commerce Platform - Backend Server using Express.js and MongoDB

## Features

✅ **Authentication & Authorization**
- JWT-based user authentication
- Role-based access control (Admin/Customer)
- Secure password hashing with bcryptjs
- Rate limiting on auth endpoints

✅ **Product Management**
- CRUD operations for products
- Product filtering and search
- Category management with subcategories
- Product reviews and ratings

✅ **Order Management**
- Create and manage orders
- Order status tracking
- Order history per user

✅ **Security**
- CORS protection with origin restrictions
- Input validation on all endpoints
- Rate limiting to prevent abuse
- Security headers with Helmet.js
- SQL injection prevention

## Project Structure

```
backend/server/
├── config/
│   └── db.js              # MongoDB connection
├── middleware/
│   ├── authMiddleware.js  # Authentication & authorization
│   ├── validation.js      # Input validation rules
│   └── rateLimit.js       # Rate limiting configuration
├── models/
│   ├── User.js            # User schema
│   ├── Product.js         # Product schema
│   ├── Order.js           # Order schema
│   └── Category.js        # Category schema
├── routes/
│   ├── authRoutes.js      # Auth endpoints
│   ├── productRoutes.js   # Product endpoints
│   ├── orderRoutes.js     # Order endpoints
│   └── categoryRoutes.js  # Category endpoints
├── utils/
│   └── generateToken.js   # JWT token generation
├── server.js              # Express app setup
└── .env.example          # Environment variables template
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Setup Steps

1. **Navigate to backend directory:**
```bash
cd backend/server
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create .env file:**
```bash
cp .env.example .env
```

4. **Configure environment variables:**
Edit `.env` and fill in:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/shoply
JWT_SECRET=your_super_secret_key_here_min_32_chars
CLIENT_URL=http://localhost:5173
```

5. **Start the server:**
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

Server will run on `http://localhost:5000`

## API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Auth | Body |
|--------|----------|-------------|------|------|
| POST | `/login` | User login | ❌ | `{email, password}` |
| POST | `/register` | Create new account | ❌ | `{name, email, password}` |
| GET | `/profile` | Get user profile | ✅ | - |
| GET | `/users` | Get all users | ✅ Admin | - |
| PUT | `/users/:id/role` | Toggle user admin status | ✅ Admin | - |

### Product Routes (`/api/products`)

| Method | Endpoint | Description | Auth | Body |
|--------|----------|-------------|------|------|
| GET | `/` | Get all products (with filters) | ❌ | - |
| GET | `/:id` | Get single product | ❌ | - |
| POST | `/` | Create product | ✅ Admin | Product data |
| PUT | `/:id` | Update product | ✅ Admin | Product data |
| DELETE | `/:id` | Delete product | ✅ Admin | - |
| POST | `/:id/reviews` | Add review to product | ✅ | Review data |
| POST | `/seed` | Generate sample products | ❌ | - |

### Category Routes (`/api/categories`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/` | Get all categories | ❌ |
| POST | `/` | Create category | ✅ Admin |
| POST | `/:id/subcategories` | Add subcategory | ✅ Admin |
| POST | `/seed` | Generate sample categories | ❌ |

### Order Routes (`/api/orders`)

| Method | Endpoint | Description | Auth | Body |
|--------|----------|-------------|------|------|
| POST | `/` | Create order | ✅ | Order data |
| GET | `/myorders` | Get user's orders | ✅ | - |
| GET | `/:id` | Get single order | ✅ | - |
| GET | `/` | Get all orders | ✅ Admin | - |
| PUT | `/:id/status` | Update order status | ✅ Admin | `{status}` |

## Request/Response Examples

### Login
**Request:**
```json
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "Password123"
}
```

**Response:**
```json
{
  "_id": "64ab8c...",
  "name": "John Doe",
  "email": "user@example.com",
  "isAdmin": false,
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

### Create Product
**Request:**
```json
POST /api/products
Authorization: Bearer <token>

{
  "name": "Laptop",
  "brand": "Dell",
  "price": 999.99,
  "originalPrice": 1299.99,
  "discount": 23,
  "category": "Electronics",
  "image": "https://..."
}
```

### Create Order
**Request:**
```json
POST /api/orders
Authorization: Bearer <token>

{
  "orderItems": [
    {
      "productId": "64ab8c...",
      "quantity": 2,
      "price": 999.99
    }
  ],
  "shippingAddress": {
    "address": "123 Main St",
    "city": "Kathmandu",
    "phone": "+977-9841234567"
  },
  "totalPrice": 1999.98
}
```

## Input Validation

All endpoints validate input before processing:

### Registration Validation
- `name`: Min 2 characters
- `email`: Valid email format
- `password`: Min 6 chars, 1 uppercase, 1 number

### Product Validation
- `name`: Min 3 characters, required
- `brand`: Required
- `price`: Positive number
- `image`: Valid URL

### Order Validation
- `orderItems`: Array with at least 1 item
- `shippingAddress.phone`: Valid phone number format

## Security Features

### Rate Limiting
- **Auth endpoints**: 5 attempts per 15 minutes
- **General API**: 100 requests per 15 minutes
- **Products**: 50 requests per hour
- **Orders**: 20 requests per hour

### CORS
- Restricted to configured origin only (default: `http://localhost:5173`)
- Credentials allowed
- Specific HTTP methods allowed: GET, POST, PUT, DELETE, PATCH

### Headers
- Helmet.js protects against common vulnerabilities
- Security headers included in all responses

### Validation
- Input sanitization on all endpoints
- Type checking for all parameters
- Prevention of NoSQL injection

## Error Handling

API returns standardized error responses:

```json
{
  "message": "Error description",
  "errors": [
    {
      "field": "email",
      "message": "Valid email is required"
    }
  ]
}
```

Common Status Codes:
- `200`: Success
- `201`: Created
- `400`: Bad Request (validation error)
- `401`: Unauthorized (invalid credentials)
- `403`: Forbidden (insufficient permissions)
- `404`: Not Found
- `429`: Too Many Requests (rate limit exceeded)
- `500`: Server Error

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| NODE_ENV | development | Environment (development/production) |
| PORT | 5000 | Server port |
| MONGODB_URI | localhost:27017 | MongoDB connection string |
| JWT_SECRET | - | Secret key for JWT (REQUIRED) |
| JWT_EXPIRE | 7d | JWT token expiration |
| CLIENT_URL | localhost:5173 | Allowed client origin |
| CLOUDINARY_* | - | For image uploads (optional) |
| KHALTI_* | - | For Khalti payment (optional) |

## Database Models

### User
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  isAdmin: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Product
```javascript
{
  name: String,
  brand: String,
  price: Number,
  originalPrice: Number,
  discount: Number,
  rating: Number,
  image: String,
  category: String,
  subcategory: String,
  countInStock: Number,
  reviews: [{username, rating, comment}],
  additionalInfo: Object,
  createdAt: Date,
  updatedAt: Date
}
```

### Order
```javascript
{
  user: ObjectId (User reference),
  orderItems: [{productId, quantity, price}],
  shippingAddress: {address, city, phone},
  paymentMethod: String,
  totalPrice: Number,
  isPaid: Boolean,
  paidAt: Date,
  status: String (Pending/Completed/Cancelled),
  createdAt: Date,
  updatedAt: Date
}
```

### Category
```javascript
{
  name: String (unique),
  subcategories: [String],
  createdAt: Date,
  updatedAt: Date
}
```

## Development

### Debugging
```bash
# Enable debug logging
DEBUG=* npm run dev
```

### Testing API
Use tools like:
- **Postman**: GUI for API testing
- **Thunder Client**: VS Code extension
- **curl**: Command line tool

Example with curl:
```bash
curl -X GET http://localhost:5000/api/products \
  -H "Content-Type: application/json"
```

## Upcoming Features

🔜 **Phase 2 (In Progress)**
- [ ] Payment gateway integration (Khalti/Stripe)
- [ ] Image upload system
- [ ] Email notifications
- [ ] Advanced product search with pagination

🔜 **Phase 3 (Planned)**
- [ ] Admin analytics dashboard
- [ ] Wishlist functionality
- [ ] Coupon/discount system
- [ ] Real-time order tracking

## Troubleshooting

### MongoDB Connection Failed
- Ensure MongoDB is running locally or check Atlas credentials
- Verify MONGODB_URI in .env file

### Port Already in Use
- Change PORT in .env file
- Or kill process: `lsof -ti:5000 | xargs kill -9` (macOS/Linux)

### JWT Token Invalid
- Ensure JWT_SECRET is set and consistent
- Check token hasn't expired

### Rate Limit Hit
- Wait for the specified duration
- Check X-RateLimit-Reset header for retry time

## Support

For issues or questions:
1. Check error message in response
2. Review API documentation above
3. Check browser console for client-side errors
4. Review server logs for backend errors

## License

This project is part of Shoply E-commerce Platform

---

**Last Updated**: May 28, 2026  
**Security Level**: Production Ready (Phase 1 Complete)
