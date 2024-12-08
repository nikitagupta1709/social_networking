import cookieParser from "cookie-parser";
import express from "express";
import userRoutes from "./src/features/user/routes/user.routes.js";
import postRoutes from "./src/features/post/routes/post.route.js";
import jwtAuth from "./src/middlewares/jwtAuth.js";
import commentRoutes from "./src/features/comment/routes/comment.routes.js";
import likeRoutes from "./src/features/like/routes/like.routes.js";
import {
  customErrorHandler,
  errorHandlerMiddleware,
} from "./src/middlewares/errorHandler.js";
import { invalidRoutesHandlerMiddleware } from "./src/middlewares/invalidRoutes.middleware.js";

const app = express();

// Middleware to parse incoming JSON request bodies
app.use(express.json());

// Middleware to parse incoming URL-encoded data (e.g., form submissions)
app.use(express.urlencoded({ extended: true }));

// Middleware to parse cookies from incoming requests
app.use(cookieParser());

// Routes for user-related endpoints (e.g., authentication, user data)
app.use("/api", userRoutes);

// Routes for post-related endpoints (requires JWT authentication)
app.use("/api/posts", jwtAuth, postRoutes);

// Routes for comment-related endpoints (requires JWT authentication)
app.use("/api/comments", jwtAuth, commentRoutes);

// Routes for like-related endpoints (requires JWT authentication)
app.use("/api/likes", jwtAuth, likeRoutes);

// Test route to demonstrate custom error handling at the app level
app.get("/test-custom-error", (req, res) => {
  throw new customErrorHandler(
    505,
    "testing app level custom error handling middleware"
  ); // Throw custom error to test middleware
});

// Test route to simulate an unhandled server error
app.get("/test-unhandled-error", (req, res) => {
  throw "Unknown Server Error"; // Simulate an unknown error
});

// Middleware to handle invalid routes (404 Not Found)
app.use(invalidRoutesHandlerMiddleware);

// Global error handler middleware to handle all errors
app.use(errorHandlerMiddleware);

export default app;
