import winston from "winston"; // Importing the Winston logging library

// Create and configure the logger
export const logger = winston.createLogger({
  level: "error", // Set the default log level to 'error'
  format: winston.format.combine(
    winston.format.printf(({ level, ...meta }) => {
      // Custom log format that includes a timestamp and relevant information
      return JSON.stringify({
        level: level, // Log level (e.g., 'error')
        timestamp: new Date().toString(), // Use new Date().toString() for the timestamp
        "request URL": meta["request URL"], // Pass the request URL where the error occurred
        "error message": meta["error message"], // Pass the error message to be logged
      });
    })
  ),
  transports: [
    new winston.transports.File({ filename: "error.log" }), // Define the transport to save logs in 'error.log'
  ],
});
