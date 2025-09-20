# E-commerce Backend API

A NestJS backend API for the Flutter e-commerce mobile app.

## Features

### Authentication & User Management
- ✅ User registration with email verification
- ✅ User login with JWT tokens
- ✅ Password reset functionality
- ✅ User profile management
- ✅ User preferences (language, notifications, theme, location)
- ✅ JWT-based authentication with guards

### Database Entities
- ✅ User entity with comprehensive profile data
- ✅ Address entity for user addresses
- ✅ Order entity for order management
- ✅ Cart Item entity for shopping cart
- ✅ Wishlist Item entity for saved products

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn

## Installation

1. Clone the repository and navigate to the backend directory:
```bash
cd e-commerce-nestjs
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp env.example .env
```

4. Update the `.env` file with your database and email configuration:
```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=ecommerce_db

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@yourapp.com

# Application Configuration
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

5. Start the development server:
```bash
npm run start:dev
```

The API will be available at `http://localhost:3000`
Swagger documentation will be available at `http://localhost:3000/api`

## API Endpoints

### Authentication

#### POST /auth/signup
Register a new user
```json
{
  "email": "user@example.com",
  "password": "password123!",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890",
  "acceptTerms": true
}
```

#### POST /auth/login
Login user
```json
{
  "email": "user@example.com",
  "password": "password123!"
}
```

#### POST /auth/forgot-password
Request password reset
```json
{
  "email": "user@example.com"
}
```

#### POST /auth/reset-password
Reset password with token
```json
{
  "token": "reset-token-here",
  "password": "newpassword123!"
}
```

#### POST /auth/verify-email
Verify email address
```json
{
  "token": "verification-token-here"
}
```

### User Profile (Protected Routes)

#### GET /auth/profile
Get user profile

#### PUT /auth/profile
Update user profile
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890",
  "profileImage": "https://example.com/profile.jpg"
}
```

#### PUT /auth/preferences
Update user preferences
```json
{
  "language": "en",
  "notificationsEnabled": true,
  "location": "New York, NY",
  "theme": "light"
}
```

#### PUT /auth/change-password
Change user password
```json
{
  "currentPassword": "oldpassword123!",
  "newPassword": "newpassword123!"
}
```

### Users (Admin Routes)

#### GET /users
Get all users (admin only)

#### GET /users/:id
Get user by ID (admin only)

#### DELETE /users/:id
Delete user (admin only)

## Database Schema

### Users Table
- `id` (UUID, Primary Key)
- `email` (String, Unique)
- `password` (String, Hashed)
- `firstName` (String, Optional)
- `lastName` (String, Optional)
- `profileImage` (String, Optional)
- `phone` (String, Optional)
- `role` (Enum: user, admin)
- `isActive` (Boolean)
- `emailVerified` (Boolean)
- `emailVerificationToken` (String, Optional)
- `passwordResetToken` (String, Optional)
- `passwordResetExpires` (Date, Optional)
- `language` (String, Default: 'en')
- `notificationsEnabled` (Boolean, Default: true)
- `location` (String, Optional)
- `theme` (String, Default: 'light')
- `createdAt` (Date)
- `updatedAt` (Date)

## Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Email verification for new accounts
- Password reset with secure tokens
- Input validation with class-validator
- CORS enabled for Flutter app

## Development

### Available Scripts

- `npm run start:dev` - Start development server with hot reload
- `npm run build` - Build the application
- `npm run start:prod` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests

### Project Structure

```
src/
├── auth/                 # Authentication module
│   ├── dto/             # Data Transfer Objects
│   ├── guards/          # JWT Auth Guard
│   ├── strategies/      # JWT Strategy
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   └── auth.module.ts
├── users/               # Users module
│   ├── entities/        # User entity
│   ├── users.controller.ts
│   ├── users.service.ts
│   └── users.module.ts
├── common/              # Shared services
│   └── services/        # Email service
├── config/              # Configuration
│   └── database.config.ts
├── addresses/           # Address entities
├── orders/              # Order entities
├── cart/                # Cart entities
├── wishlist/            # Wishlist entities
├── app.module.ts        # Main app module
└── main.ts              # Application entry point
```

## Next Steps

The following modules are planned for implementation:
- Product management module
- Shopping cart functionality
- Order management system
- Payment and wallet system
- Notification system

## License

MIT
# e-commerce-nestjs
