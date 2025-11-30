# Hotel Booking Website

A full-stack hotel booking web application built with the MERN stack (MongoDB, Express.js, React, Node.js). This platform allows users to search for hotels, view hotel details, make bookings, and manage their own hotel listings.

## Features

- **User Authentication**: Secure user registration and login functionality
- **Search Hotels**: Search for hotels with various filters and criteria
- **View Hotels**: Browse and view detailed information about available hotels
- **Add Hotels**: Hotel owners can add and manage their hotel listings
- **Book Hotels**: Users can make bookings for available hotels
- **Payment Integration**: Integrated with Stripe for secure payment processing

## Tech Stack

### Frontend
- **React** - UI library for building user interfaces
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Tanstack Query** - Data fetching and state management
- **Context API** - For client side state management
- **React Hook Form** - Form validation and handling

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **TypeScript** - Type-safe JavaScript
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **AWS S3 Bucket** - Image upload handling
- **Stripe** - Payment processing

### Testing
- **Playwright** - End-to-end testing

## Getting Started

### Environment Variables

Create `.env` files in the backend directory with the following variables:

```env
JWT_SECRET=****
MONGODB_URI=****
S3_ACCESS_KEY=****
S3_BUCKET_NAME=****
S3_REGION=****
S3_SECRET_KEY=****
STRIPE_API_KEY=****
FRONTEND_URL=****
PORT=****
NODE_ENV=****
```

### Installation

1. Clone the repository:
```bash
git clone https://github.com/NoorFatima01/hotel-booking-website.git
cd hotel-booking-website
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

### Running the Application

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. Start the frontend development server:
```bash
cd frontend
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Building for Production

1. Build the backend:
```bash
cd backend
npm run build
```

2. Build the frontend:
```bash
cd frontend
npm run build
```

### Running Tests

Run end-to-end tests:
```bash
cd e2etests
npx playwright test
```

## API Routes

The backend provides the following main API routes:

- `/api/auth` - Authentication endpoints (login, register, logout)
- `/api/users` - User management
- `/api/my-hotels` - Hotel management for owners
- `/api/hotels` - Public hotel browsing and booking
