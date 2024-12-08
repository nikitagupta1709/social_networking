import jwt from "jsonwebtoken"; // Importing JSON Web Token (JWT) for token verification
import { customErrorHandler } from "./errorHandler.js"; // Custom error handler for consistent error responses

// Middleware to authenticate requests using JWT
const jwtAuth = (req, res, next) => {
  const { jwtToken } = req.cookies; // Extract JWT token from cookies

  // Verify the JWT token
  jwt.verify(jwtToken, "SocialNetworking2024", (err, decoded) => {
    if (err) {
      // If token verification fails, throw an authentication error
      throw new customErrorHandler(401, "Login to continue");
      // Optionally, you could send a response here instead of throwing an error
      // res.status(401).json({ status: "success", msg: "Login to continue" });
    } else {
      // If verification succeeds, attach user data to the request object
      const userData = decoded;
      req.userId = userData.userId; // Add userId to the request for further use
      next(); // Proceed to the next middleware or route handler
    }
  });
};

export default jwtAuth;
