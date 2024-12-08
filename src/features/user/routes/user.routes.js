// Importing required modules
import express from "express";
import { signUp, singIn } from "../controllers/user.controller.js"; // Controller functions for user signup and login

const router = express.Router(); // Creating an instance of the Express router

// Handles POST requests to '/signup' and triggers the signUp controller
router.route("/signup").post(signUp);

// Handles POST requests to '/signin' and triggers the singIn controller
router.route("/signin").post(singIn);

export default router;
