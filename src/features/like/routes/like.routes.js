import express from "express";
import { addDelete, getAllPostLikes } from "../controllers/like.controller.js"; // Importing controller functions

const router = express.Router();

// Route to get all likes for a specific post
router.route("/:postId").get(getAllPostLikes); // GET /likes/:postId

// Route to toggle a like for a specific post (add or remove)
router.route("/toggle/:postId").get(addDelete); // GET /likes/toggle/:postId

export default router;
