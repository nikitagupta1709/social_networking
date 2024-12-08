import { logger } from "./logger.middleware.js"; // Importing the logger middleware for logging errors

// Custom error handler class
export class customErrorHandler extends Error {
  constructor(statusCode, errMessage) {
    super(errMessage); // Call the parent Error class constructor with the error message
    this.statusCode = statusCode; // HTTP status code for the error
    this.errMessage = errMessage; // Custom error message
  }
}

// Middleware for handling errors globally in the application
export const errorHandlerMiddleware = (err, req, res, next) => {
  let message = ""; // Variable to store the error message

  // Check if the error is an instance of customErrorHandler
  if (err instanceof customErrorHandler) {
    message = err?.errMessage; // Extract the custom error message
    res.status(err?.statusCode).send(err?.errMessage); // Send the error message with the appropriate status code
  } else {
    // Handle general or unexpected errors
    message = "Sorry! Something went wrong... Please try again later!";
    res
      .status(500) // Internal Server Error status code
      .send("Sorry! Something went wrong... Please try again later!");
  }

  // Log the error details using the logger middleware
  logger.log({
    level: "error", // Log level
    "request URL": req.originalUrl, // The URL where the error occurred
    "error message": message, // The error message to log
  });
};
