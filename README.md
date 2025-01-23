# MovieMania Backend API Documentation

## Base URL
```
http://localhost:8000/api/v1
```

## Authentication Routes

### Register User
```
POST /auth/register
```
- Registers a new user.
- **Request Body:**
  ```json
  {
    "fullName": "John Doe",
    "email": "john@example.com",
    "phoneNumber": "1234567890",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "status": 201,
    "message": "User registered successfully",
    "data": {
      "user": {
        "_id": "userId",
        "fullName": "John Doe",
        "email": "john@example.com",
        "phoneNumber": "1234567890"
      },
      "accessToken": "accessToken"
    }
  }
  ```

### Login User
```
POST /auth/login
```
- Logs in an existing user.
- **Request Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "status": 200,
    "message": "User logged In Successfully",
    "data": {
      "user": {
        "_id": "userId",
        "fullName": "John Doe",
        "email": "john@example.com",
        "phoneNumber": "1234567890"
      },
      "accessToken": "accessToken"
    }
  }
  ```

### Logout User
```
POST /auth/logout
```
- Logs out the current user.
- **Response:**
  ```json
  {
    "status": 200,
    "message": "User logged out successfully"
  }
  ```

## Movie Routes

### Add New Movie
```
POST /movies/
```
- Adds a new movie (Admin only).
- **Request Headers:**
  ```
  Authorization: Bearer <accessToken>
  ```
- **Request Body:**
  ```json
  {
    "title": "Movie Title",
    "description": "Movie Description",
    "rating": 8.5,
    "releaseDate": "2023-10-01"
  }
  ```
- **Response:**
  ```json
  {
    "status": 201,
    "message": "Movie added successfully",
    "data": {
      "_id": "movieId",
      "title": "Movie Title",
      "description": "Movie Description",
      "poster": "/uploads/posters/poster.jpg",
      "rating": 8.5,
      "duration": 120,
      "createdBy": "adminUserId",
      "releaseDate": "2023-10-01"
    }
  }
  ```

### Get Movies
```
GET /movies/
```
- Retrieves all movies.
- **Response:**
  ```json
  {
    "status": 200,
    "message": "Movies retrieved successfully",
    "data": [
      {
        "_id": "movieId",
        "title": "Movie Title",
        "description": "Movie Description",
        "poster": "/uploads/posters/poster.jpg",
        "rating": 8.5,
        "duration": 120,
        "createdBy": "adminUserId",
        "releaseDate": "2023-10-01"
      }
    ]
  }
  ```

### Get Sorted Movies
```
GET /movies/sorted?sortBy=<field>
```
- Retrieves movies sorted by a specific field (name, rating, releaseDate, duration).
- **Response:**
  ```json
  {
    "status": 200,
    "message": "Movies retrieved successfully",
    "data": [
      {
        "_id": "movieId",
        "title": "Movie Title",
        "description": "Movie Description",
        "poster": "/uploads/posters/poster.jpg",
        "rating": 8.5,
        "duration": 120,
        "createdBy": "adminUserId",
        "releaseDate": "2023-10-01"
      }
    ]
  }
  ```

### Search Movies
```
GET /movies/search?name=<searchQuery>
```
- Searches for movies by title or description.
- **Response:**
  ```json
  {
    "status": 200,
    "message": "Movies retrieved successfully",
    "data": [
      {
        "_id": "movieId",
        "title": "Movie Title",
        "description": "Movie Description",
        "poster": "/uploads/posters/poster.jpg",
        "rating": 8.5,
        "duration": 120,
        "createdBy": "adminUserId",
        "releaseDate": "2023-10-01"
      }
    ]
  }
  ```

### Edit Movie
```
PUT /movies/:id
```
- Edits an existing movie (Admin only).
- **Request Headers:**
  ```
  Authorization: Bearer <accessToken>
  ```
- **Request Body:**
  ```json
  {
    "title": "Updated Movie Title",
    "description": "Updated Movie Description",
    "rating": 9.0,
    "releaseDate": "2023-11-01"
  }
  ```
- **Response:**
  ```json
  {
    "status": 200,
    "message": "Movie updated successfully",
    "data": {
      "_id": "movieId",
      "title": "Updated Movie Title",
      "description": "Updated Movie Description",
      "poster": "/uploads/posters/poster.jpg",
      "rating": 9.0,
      "duration": 120,
      "createdBy": "adminUserId",
      "releaseDate": "2023-11-01"
    }
  }
  ```

### Delete Movie
```
DELETE /movies/:id
```
- Deletes an existing movie (Admin only).
- **Request Headers:**
  ```
  Authorization: Bearer <accessToken>
  ```
- **Response:**
  ```json
  {
    "status": 200,
    "message": "Movie deleted successfully",
    "data": {
      "_id": "movieId",
      "title": "Movie Title",
      "description": "Movie Description",
      "poster": "/uploads/posters/poster.jpg",
      "rating": 8.5,
      "duration": 120,
      "createdBy": "adminUserId",
      "releaseDate": "2023-10-01"
    }
  }
  ```

## Error Handling
- All error responses follow this format:
  ```json
  {
    "status": <statusCode>,
    "message": "<errorMessage>",
    "data": null
  }
  ```

## Environment Variables
- `PORT`: The port on which the server runs.
- `MONGODB_URI`: The MongoDB connection URI.
- `ACCESS_TOKEN_SECRET`: The secret key for JWT access token.
- `CLIENT_URL`: The URL of the client application.

## Setup Instructions
1. Clone the repository.
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file and add the necessary environment variables.
4. Start the server:
   ```
   npm start
   ```

<!-- admin@gmail.com -->
<!-- raunak@ -->

