# Notes API

A RESTful API for managing personal notes with user authentication. Built with Node.js, Express, and MongoDB. The project focuses on clean API design, sensible defaults, and production-style concerns like validation, error handling, security, and testing.

## Why This Project Exists

This project was built as a practical backend exercise rather than a tutorial clone. The aim was to build something small but realistic, with proper authentication, validation, pagination, testing, and basic security concerns handled in a way you’d expect to see in a real codebase.

A live production instance is also available (see Deployment section below).



## Features

- **JWT Authentication** - User registration and login with JSON Web Tokens
- **Notes Management** - Create, read, update, and delete notes
- **Tags Support** - Organise notes with custom tags
- **Completion Status** - Mark notes as completed or pending
- **Pagination** - Paginated responses for retrieving notes
- **Filtering & Sorting** - Filter by completion status and sort by different fields
- **Input Validation** - Request validation using express-validator
- **Error Handling** - Centralised error handling with custom error classes
- **Testing** - Test suite with Jest and Supertest using in-memory MongoDB
- **Rate Limiting** – Global request limits with stricter limits on auth routes
- **Security Hardening** – Secure HTTP headers, CORS configuration, and payload size limits


## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js 5.x
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **Validation**: express-validator
- **Testing**: Jest, Supertest, mongodb-memory-server

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (local instance or MongoDB Atlas)
- npm or yarn

## Installation

1. Clone the repository

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/notes-api
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=1d
```

4. Update the environment variables with your own values. Make sure to set:
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: A strong, random secret key for JWT signing

## Running the Application

### Development Mode
```bash
npm run dev
```
Runs the server with nodemon for auto-reloading on file changes.

### Production Mode
```bash
npm start
```

The API will be available at `http://localhost:3000` (or whatever port you've set in your `.env` file).

## API Endpoints

### Health Check

**GET** `/health`
- Check API status
- **Response**: 
  ```json
  {
    "status": "ok",
    "uptime": 123.45,
    "timestamp": "2026-01-01T00:00:00.000Z"
  }
  ```

### Authentication

**POST** `/auth/register`
- Register a new user
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response** (201):
  ```json
  {
    "message": "User created",
    "userId": "507f1f77bcf86cd799439011"
  }
  ```

**POST** `/auth/login`
- Log in with email and password
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response** (200):
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```

### Notes (Protected Routes - Authentication Required)

All notes endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

**POST** `/notes`
- Create a new note
- **Request Body**:
  ```json
  {
    "title": "My Note Title",
    "content": "Note content here",
    "tags": ["work", "personal"],
    "completed": false
  }
  ```
- **Validation Rules**:
  - `title`: Required, max 100 characters
  - `content`: Optional, max 5000 characters
  - `tags`: Optional array of strings
  - `completed`: Optional boolean
- **Response** (201): Returns the created note

**GET** `/notes`
- Get all notes for the authenticated user
- **Query Parameters**:
  - `page` (optional): Page number (default: 1)
  - `limit` (optional): Items per page (default: 10)
  - `completed` (optional): Filter by completion status (`true` or `false`)
  - `sort` (optional): Sort field and order (format: `field:asc` or `field:desc`, default: `createdAt:desc`)
- **Example**: `/notes?page=1&limit=10&completed=false&sort=createdAt:desc`
- **Response** (200):
  ```json
  {
    "data": [...],
    "meta": {
      "total": 50,
      "page": 1,
      "pages": 5
    }
  }
  ```

**GET** `/notes/:id`
- Get a specific note by ID
- **Response** (200): Returns the note
- **Error** (404): `{ "status": "fail", "message": "Note not found" }`

**PUT** `/notes/:id`
- Update a note
- **Request Body**: Same as POST, but all fields are optional
- **Response** (200): Returns the updated note
- **Error** (404): `{ "status": "fail", "message": "Note not found" }`

**DELETE** `/notes/:id`
- Delete a note
- **Response** (204): No content
- **Error** (404): `{ "status": "fail", "message": "Note not found" }`

## Error Responses

Errors are returned in a consistent JSON format.

**Validation errors** return a list of fields and messages:

```json
{
  "errors": [
    {
      "field": "title",
      "message": "Title is required"
    }
  ]
}

```

## Testing

Run the tests:
```bash
npm test
```

The test suite uses:
- **Jest** for the test framework
- **Supertest** for HTTP assertions
- **mongodb-memory-server** for in-memory MongoDB instances (no real database needed)

Test files are in the `tests/` directory:
- `auth.test.js` - Tests for authentication endpoints
- `notes.test.js` - Tests for notes endpoints
- `setup.js` - Database setup and teardown utilities for tests

## Project Structure

```
notes-api/
├── src/
│   ├── app.js                 # Express app configuration
│   ├── server.js              # Server entry point
│   ├── config/
│   │   ├── db.js              # Database connection
│   │   └── env.js             # Environment configuration
│   ├── middleware/
│   │   ├── auth.middleware.js # JWT authentication
│   │   ├── error.middleware.js # Error handling
│   │   └── validate.middleware.js # Validation results handler
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.controller.js
│   │   │   ├── auth.routes.js
│   │   │   ├── auth.service.js
│   │   │   └── user.model.js
│   │   └── notes/
│   │       ├── note.model.js
│   │       ├── notes.controller.js
│   │       ├── notes.routes.js
│   │       ├── notes.service.js
│   │       └── notes.validation.js
│   ├── routes/
│   │   └── health.routes.js
│   └── utils/
│       ├── AppError.js        # Custom error class
│       └── asyncHandler.js    # Async error wrapper
├── tests/
│   ├── auth.test.js
│   ├── notes.test.js
│   └── setup.js
├── scripts/
│   └── seedNotes.js          # Database seeding script
├── jest.config.js            # Jest configuration
├── package.json
└── README.md
```

## Security Features

- **Password Hashing**: Passwords are hashed using bcrypt before being stored
- **JWT Tokens**: Token-based authentication
- **Input Validation**: All user inputs are validated before processing
- **Error Messages**: Generic error messages for security-sensitive endpoints
- **Authentication Required**: Protected routes require valid JWT tokens
- **Rate limiting** using `express-rate-limit` to prevent abuse
  - Global limits applied to all routes
  - Stricter limits on authentication endpoints to reduce brute-force attempts
- **Secure HTTP headers** via `helmet`
- **CORS configuration** to restrict browser-based access to known origins
- **Request size limits** to avoid overly large payloads
- **Environment-aware error handling**
  - Stack traces are shown in development
  - Production responses avoid leaking internal details

These features are intentionally kept simple and readable rather than over-engineered.

## Development

### Seeding the Database

There's a seed script you can use to populate the database with test data:

```bash
node scripts/seedNotes.js
```

**Note**: You'll need to update the `USER_ID` in the seed script with a valid user ID from your database.


## Deployment

The API is deployed and running in production.

- **Hosting**: Render
- **Database**: MongoDB Atlas
- **Environment**: Production

Base URL: https://notes-api-lhik.onrender.com

The `/health` endpoint can be used to check service status.

## Notes

This project is intended as a backend-focused API rather than a full product. 
There is no frontend included, and authentication is handled via JWTs passed in the `Authorization` header.

The implementation favours clarity and maintainability over edge-case optimisation.

## Possible Future Improvements

- Full-text search across note content
- Tag-based filtering
- Refresh token support
- API documentation using OpenAPI / Swagger





