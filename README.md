# Notes API with User Authentication

This project is a simple Express and MongoDB Notes API.

- Register and log in
- Create notes
- View their own notes
- Update their own notes
- Delete their own notes
JWT authentication is used to protect routes.

## Features
Password hashing with bcrypt
JWT authentication
Notes linked to logged-in user
Ownership-based authorization for update and delete

## Technologies Used
Node.js
Express.js
MongoDB
Mongoose
JWT
bcrypt
dotenv

## API Routes

### User Routes
POST /api/users/register
POST /api/users/login

### Note routes:
GET /api/notes
POST /api/notes
PUT /api/notes/:id
DELETE /api/notes/:id