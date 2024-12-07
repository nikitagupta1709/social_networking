// Please don't change the pre-written code
// Import the necessary modules here
import winston from "winston";

export const logger = winston.createLogger({
  level: "error",
  format: winston.format.combine(
    winston.format.printf(({ level, ...meta }) => {
      // Use new Date().toString() for the timestamp
      return JSON.stringify({
        level: level,
        timestamp: new Date().toString(), // Custom timestamp
        "request URL": meta["request URL"], // Pass the request URL
        "error message": meta["error message"], // Pass the error message
      });
    })
  ),
  transports: [
    new winston.transports.File({ filename: "error.log" }), // Save logs to error.log
  ],
});
