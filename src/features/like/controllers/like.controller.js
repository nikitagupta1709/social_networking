import { customErrorHandler } from "../../../middlewares/errorHandler.js";
import { getPostLike, tooglePost } from "../models/like.model.js";

// Controller to handle fetching all likes for a specific post
export const getAllPostLikes = (req, res, next) => {
  // Extract postId from request parameters
  const { postId } = req.params;

  // Call the model function to get likes for the specific post
  const result = getPostLike(postId);

  // If the result is successful, return the likes with a 200 status code
  if (result?.success) {
    res.status(200).json(result);
  } else {
    // If no post found or another error occurs, throw a custom error with status 400
    throw new customErrorHandler(400, result?.msg);
    // Optionally, you could use res.status(400).json(result) for direct response
  }
};

// Controller to handle toggling the like status (add or remove like) for a post
export const addDelete = (req, res, next) => {
  // Extract userId from the request object (this should be set by authentication middleware)
  const userId = req.userId;
  // Extract postId from the request parameters
  const { postId } = req.params;

  // Call the model function to toggle the like status (add or remove like)
  const result = tooglePost(userId, postId);

  // If the result is successful, return the updated like status with a 200 status code
  if (result?.success) {
    res.status(200).json(result);
  } else {
    // If there is an error, throw a custom error with status 400
    throw new customErrorHandler(400, result?.msg);
    // Optionally, you could use res.status(400).json(result) for direct response
  }
};
