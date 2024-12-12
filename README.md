# Social Networking Platform

Social networking platform which enable user authentication and allow them to create posts with text and media and support user engagement with likes and comments.

# API for Post, Comment, Like, and User Management

This project is a RESTful API built with **Express.js** to manage users, posts, comments, and likes. The API includes JWT authentication and custom error handling middleware. Below is a guide to the project's features, installation, and usage.

# Social Media Application API

This is a RESTful API for a social media application built using **Express.js**, designed to handle user authentication, posts, comments, and likes. The API follows modern practices such as JWT-based authentication, custom error handling, and middleware for various functionalities.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Features](#features)
- [Code Organization](#code-organization)

## Technologies Used

- **Node.js**: JavaScript runtime environment for building the server-side application.
- **Express.js**: Web framework for Node.js, used for routing and handling HTTP requests.
- **JWT (JSON Web Tokens)**: Authentication method used for securing routes.
- **cookie-parser**: Middleware for parsing cookies in requests.
- **Custom Middleware**: For handling errors and invalid routes.

## Features

- **User Authentication**: User login and registration with JWT-based authentication.
- **Posts**: Users can create, edit, and delete posts.
- **Comments**: Users can add, edit, and delete comments on posts.
- **Likes**: Users can like and unlike posts, with tracking for likes per post.
- **Error Handling**: Custom error handling for better clarity and troubleshooting.

## Code Organization

The code is structured into multiple layers for clarity and maintainability:

1. **`src/`**: Contains all the application code.
   - **`features/`**: Contains different features like user, post, comment, and like.
     - **`user/`**: Handles user-related routes, models, and controllers.
     - **`post/`**: Manages post-related routes, models, and controllers.
     - **`comment/`**: Manages comment-related routes, models, and controllers.
     - **`like/`**: Manages like-related routes, models, and controllers.
   - **`middlewares/`**: Contains middleware for JWT authentication, custom error handling, and invalid route handling.
   - **`utils/`**: Any utility/helper functions (if applicable).
2. **`public/`**: Folder for static assets like images or front-end resources.
3. **`test/`**: Contains any test files (unit tests, integration tests, etc.)

### Example Folder Structure

```plaintext
src/
  features/
    user/
      routes/
      controllers/
      models/
    post/
      routes/
      controllers/
      models/
    comment/
      routes/
      controllers/
      models/
    like/
      routes/
      controllers/
      models/
  middlewares/
    errorHandler.js
    invalidRoutes.middleware.js
    jwtAuth.js
  utils/
  public/
  test/
```
