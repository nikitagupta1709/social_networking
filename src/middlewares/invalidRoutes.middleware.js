// Middleware to handle invalid or undefined routes
export const invalidRoutesHandlerMiddleware = (req, res, next) => {
  res
    .status(404) // Set the HTTP status code to 404 (Not Found)
    .json({
      success: false, // Indicate failure in the response
      msg: `Invalid path: ${req.originalUrl}`, // Include the requested invalid path in the message
    });
  next(); // Pass control to the next middleware (if any)
};
