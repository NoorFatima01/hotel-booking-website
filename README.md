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
- **React Query** - Data fetching and state management
- **React Hook Form** - Form validation and handling

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **TypeScript** - Type-safe JavaScript
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **Multer** - File upload handling
- **Stripe** - Payment processing

### Testing
- **Playwright** - End-to-end testing

## Project Structure

```
hotel-booking-website/
├── backend/          # Express.js backend server
│   ├── src/
│   │   ├── models/   # Database models
│   │   ├── routes/   # API routes
│   │   ├── middleware/ # Custom middleware
│   │   └── index.ts  # Server entry point
│   └── package.json
├── frontend/         # React frontend application
│   ├── src/
│   │   ├── components/ # Reusable components
│   │   ├── pages/    # Page components
│   │   ├── context/  # React context providers
│   │   ├── layouts/  # Layout components
│   │   └── App.tsx   # Main app component
│   └── package.json
└── e2etests/        # End-to-end tests
    └── package.json
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn package manager

### Environment Variables

Create `.env` files in the backend directory with the following variables:

```env
MONGODB_CONNECTION_STRING=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret_key
FRONTEND_URL=http://localhost:5173
STRIPE_API_KEY=your_stripe_api_key
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

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the ISC License.

## Author

NoorFatima01
