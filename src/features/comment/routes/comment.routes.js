import express from "express";
import {
  deleteComment, // Controller to delete a comment
  fetchCommentForPost, // Controller to fetch all comments for a specific post
  newComment, // Controller to add a new comment
  putComment, // Controller to update an existing comment
} from "../controllers/comment.controller.js";

const router = express.Router();

// Route to get comments for a specific post by postId
router.route("/:id").get(fetchCommentForPost);

// Route to add a new comment to a specific post by postId
router.route("/:id").post(newComment);

// Route to delete a specific comment by commentId
router.route("/:id").delete(deleteComment);

// Route to update a specific comment by commentId
router.route("/:id").put(putComment);

export default router;
