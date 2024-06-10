# Mobile Server Backend

This is the backend server for the mobile application. It is built using Node.js, Express, and MongoDB. The server handles user authentication, character data management, and other related functionalities.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication (Sign Up, Sign In, Forgot Password)
- JWT-based authorization
- Character data management
- Secure endpoints with Helmet and CORS support

## Technologies Used

- Node.js
- Express
- MongoDB
- Mongoose
- Bcrypt
- JWT
- Helmet
- CORS
- Dotenv

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB (local or Atlas)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Vijaykumar-developer-design/project.git
   cd mobileserver/server
## Create a .env file:

Create a .env file in the server directory and add the following environment variables:
DATABSE_ADDRESS=your_database_connection_string
SECRET_KEY=your_jwt_secret_key
PORT=5000
## API Endpoints
POST /api/signup: Sign up a new user
POST /api/signin: Sign in an existing user
POST /api/forgot: Handle forgotten password
GET /api/characters: Get all characters (requires authorization)
GET /api/character/:id: Get character details by ID (requires authorization)
## Start the backend server :
npm run dev 
## Start the frontend server :
npm start
### Frontend

- **React**: A JavaScript library for building user interfaces
- **Axios**: Promise-based HTTP client for making API requests
- **React Router**: Declarative routing for React applications
