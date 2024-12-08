import { customErrorHandler } from "../../../middlewares/errorHandler.js";
import {
  addNewComment,
  deleteCommentModel,
  editCommentModel,
  getCommentsForPostId,
} from "../models/comment.model.js";

// Fetch comments for a specific post by postId
export const fetchCommentForPost = (req, res, next) => {
  const { id } = req.params; // Extract postId from request parameters
  const result = getCommentsForPostId(id); // Get comments for the post
  if (result?.success) {
    res.status(200).json(result); // Return comments if found
  } else {
    throw new customErrorHandler(400, result?.msg); // Throw error if no comments found
    // res.status(400).json(result);
  }
};

// Add a new comment to a specific post
export const newComment = (req, res, next) => {
  const userId = req.userId; // Get userId from the request
  const { id } = req.params; // Extract postId from request parameters
  const { content } = req.body; // Get the content of the comment from request body

  if (content === "") {
    res.status(400).json({ succes: false, msg: "No content entered" }); // Return error if no content is provided
    return;
  }

  const result = addNewComment(userId, Number(id), content); // Add new comment
  if (result?.success) {
    res.status(200).json(result); // Return success response with new comment
  } else {
    throw new customErrorHandler(400, result?.msg); // Throw error if comment addition fails
    // res.status(400).json(result);
  }
};

// Delete a specific comment by commentId
export const deleteComment = (req, res, next) => {
  const { id } = req.params; // Extract commentId from request parameters
  const result = deleteCommentModel(id); // Delete comment
  if (result?.success) {
    res.status(200).json(result); // Return success response with deleted comment
  } else {
    throw new customErrorHandler(400, result?.msg); // Throw error if comment deletion fails
    // res.status(400).json(result);
  }
};

// Edit the content of an existing comment by commentId
export const putComment = (req, res, next) => {
  const { id } = req.params; // Extract commentId from request parameters
  const { content } = req.body; // Get the updated content of the comment from request body

  if (!content) {
    throw new customErrorHandler(400, "No content available!!"); // Throw error if content is missing
    // res.status(400).json({ success: false, msg: "No content available!!" });
  }

  const result = editCommentModel(id, content); // Edit the comment content
  if (result.success) {
    res.status(200).json(result); // Return success response with updated comment
  } else {
    throw new customErrorHandler(400, result?.msg); // Throw error if comment editing fails
    // res.status(400).json(result);
  }
};
