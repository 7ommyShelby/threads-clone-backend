# Threads Clone Backend

This repository contains the backend code for a Threads clone application. The backend is built using Node.js and Express.js, and it provides various routes to handle user authentication, user actions, and post interactions.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Routes](#routes)
- [Middleware](#middleware)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/threads-clone-backend.git
   cd threads-clone-backend

2. API Routes for Threads Clone Backend

This document outlines the various routes available in the backend of the Threads clone application. The routes are divided into user-related routes and post-related routes. Each route is designed to handle specific actions, and some require user authentication.

## Table of Contents

- [User Routes](#user-routes)
- [Post Routes](#post-routes)
- [Middleware](#middleware)

## User Routes

### `GET /getusers`
- **Description**: Retrieve all users.
- **Authentication**: None

### `GET /userinfo`
- **Description**: Retrieve authenticated user's information.
- **Authentication**: Required

### `GET /profile/:query`
- **Description**: Retrieve user profile based on the query.
- **Authentication**: None

### `POST /signup`
- **Description**: Create a new user account.
- **Authentication**: None

### `POST /login`
- **Description**: Log in to an existing user account.
- **Authentication**: None

### `POST /follow/:id`
- **Description**: Follow a user.
- **Authentication**: Required

### `POST /update/:id`
- **Description**: Update user information.
- **Authentication**: Required

## Post Routes

### `GET /userposts/:id`
- **Description**: Retrieve posts of a specific user.
- **Authentication**: Required

### `GET /feed`
- **Description**: Retrieve the feed posts.
- **Authentication**: Required

### `GET /:id`
- **Description**: Retrieve a specific post by ID.
- **Authentication**: None

### `POST /create`
- **Description**: Create a new post.
- **Authentication**: Required

### `POST /like/:id`
- **Description**: Like a post.
- **Authentication**: Required

### `POST /reply/:id`
- **Description**: Reply to a post.
- **Authentication**: Required

### `DELETE /:id`
- **Description**: Delete a post.
- **Authentication**: Required

## Middleware

### `userauth`
- **Description**: Middleware to authenticate users before allowing access to certain routes.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.