// Importing necessary modules and middleware
import { customErrorHandler } from "../../../middlewares/errorHandler.js"; // Custom error handler middleware
import { loginUser, registerUser } from "../models/user.model.js"; // Functions to handle user login and registration
import jwt from "jsonwebtoken"; // Library for generating JSON Web Tokens

// Function to handle user signup
export const signUp = (req, res, next) => {
  const userData = req.body; // Extracting user data from the request body
  if (userData?.email && userData?.name && userData?.password) {
    // Check if all required fields are provided
    let user = registerUser(userData); // Register the user using the model function
    res.status(201).send({ status: "success", user }); // Send a success response with the user data
  } else {
    // If required fields are missing, throw an error
    throw new customErrorHandler(400, "Invalid user details !!");
    // The commented code below is an alternative approach to sending a failure response
    // res.status(400).json({ status: "failure", msg: "invalid user details;" });
  }
};

// Function to handle user login
export const singIn = (req, res, next) => {
  let user = loginUser(req.body); // Attempt to log in the user using the provided credentials
  if (user) {
    // If user login is successful
    const token = jwt.sign(
      { userId: user.id, userEmail: user.email }, // Payload for the JWT
      "SocialNetworking2024", // Secret key for signing the token
      { expiresIn: "3h" } // Token expiration time
    );
    res
      .status(201)
      .cookie("jwtToken", token, { maxAge: 900000, httpOnly: false }) // Set the JWT token as a cookie
      .cookie("userId", user.id, { maxAge: 900000, httpOnly: false }) // Set the user ID as a cookie
      .json({ status: "success", msg: "Login successful", token }); // Send a success response with the token
  } else {
    // If login fails, throw an error
    throw new customErrorHandler(400, "Invalid user details !!");
    // The commented code below is an alternative approach to sending a failure response
    // res.status(400).json({ status: "failure", msg: "invalid user deatils" });
  }
};
