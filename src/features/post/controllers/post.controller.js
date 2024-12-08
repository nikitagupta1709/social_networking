import { customErrorHandler } from "../../../middlewares/errorHandler.js"; // Custom error handler for consistent error responses
import {
  createNewPost,
  deletePost,
  editPost,
  fetchAllPosts,
  getSpecificPost,
  getUserPosts,
} from "../models/post.model.js"; // Importing post-related database functions

// Fetch all posts
export const getAllPosts = (req, res, next) => {
  const posts = fetchAllPosts(); // Retrieve all posts
  if (posts?.length > 0) {
    res.status(200).json({ success: true, posts }); // If posts exist, return them
  } else {
    throw new customErrorHandler(400, "No post found!!"); // If post is not found, throw an error

    // res.status(400).json({ success: true, msg: "No posts found" }); // ALternative response
  }
};

// Fetch a specific post by ID
export const getOnePost = (req, res, next) => {
  const { id } = req.params; // Extract the post ID from the request parameters
  const result = getSpecificPost(Number(id)); // Retrieve the specific post
  if (result) {
    res.status(200).json({ success: true, result }); // If post is found, return it
  } else {
    throw new customErrorHandler(400, "No post found!!"); // If post is not found, throw an error
    // res.status(400).json({ success: false, msg: "No post found!!" }); // Alternative response
  }
};

// Fetch posts of a specific user
export const getUserSpecificPost = (req, res, next) => {
  const userId = req.userId; // Extract the user ID from the request
  if (!userId) {
    throw new customErrorHandler(400, "No user found!!"); // If no user is found, throw an error
    // res.status(401).json({ success: false, msg: "No user found" }); // Alternative response
  }
  const result = getUserPosts(userId); // Retrieve posts for the user
  if (result) {
    res.status(200).json({ success: true, result }); // If posts are found, return them
  } else {
    throw new customErrorHandler(400, "No post found!!"); // If no posts are found, throw an error
    // res.status(400).json({ status: false, msg: "No post found for logged in user!!" }); // Alternative response
  }
};

// Add a new post
export const addPost = (req, res, next) => {
  const userId = req.userId; // Extract the user ID from the request
  const { caption } = req.body; // Extract the caption from the request body
  const imageUrl = req.file ? `/public/upload/${req.file.filename}` : null; // If an image is uploaded, store its URL
  if (!caption && !imageUrl) {
    throw new customErrorHandler(
      400,
      "Caption or media is required to create a post." // Ensure either caption or media is provided
    );
  }
  const result = createNewPost(userId, caption, imageUrl); // Create the new post
  res.status(200).json({ success: true, posts: result }); // Return the created post
};

// Remove a post
export const removePost = (req, res, next) => {
  const { id } = req.params; // Extract the post ID from the request parameters
  const result = deletePost(id); // Delete the post by its ID
  if (result?.status) {
    res.status(200).json(result); // If post is successfully deleted, return the result
  } else {
    throw new customErrorHandler(400, result?.msg); // If deletion fails, throw an error
    // res.status(400).json(result); // Alternative response
  }
};

// Update an existing post
export const updatePost = (req, res, next) => {
  const { id } = req.params; // Extract the post ID from the request parameters
  const { caption } = req.body; // Extract the caption from the request body
  const imageUrl = req.file ? `/public/upload/${req.file.filename}` : null; // If an image is uploaded, store its URL
  const result = editPost(id, caption, imageUrl); // Edit the post with the new data
  if (result?.success) {
    res.status(200).json(result); // If the post is successfully updated, return the result
  } else {
    throw new customErrorHandler(400, result?.msg); // If update fails, throw an error
    // res.status(400).json(result); // Alternative response
  }
};
