import { getAllComments } from "../../comment/models/comment.model.js";
import { getAllUsers } from "../../user/models/user.model.js";

// Initialize the id counter
let id = 0;

// Post model class to define the structure of each post
export class postModel {
  constructor(userId, caption, imageUrl) {
    this.id = ++id; // Increment the id for each new post
    this.userId = userId; // Store the user ID of the post creator
    this.caption = caption; // Caption for the post
    this.imageUrl = imageUrl; // URL for the post image
  }
}

// Sample in-memory posts array to simulate a database
const posts = [
  new postModel(
    2,
    "Leaves on the ground",
    "https://img.freepik.com/free-photo/abstract-autumn-beauty-multi-colored-leaf-vein-pattern-generated-by-ai_188544-9871.jpg"
  ),
  new postModel(
    3,
    "Mountain in the beach",
    "https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_640.jpg"
  ),
];

// Fetch all posts
export const fetchAllPosts = () => {
  return posts; // Return the array of posts
};

// Get a specific post by its ID
export const getSpecificPost = (id) => {
  const result = posts?.find((p) => p.id === id); // Find the post by its ID
  return result; // Return the post if found, otherwise undefined
};

// Get posts by a specific user
export const getUserPosts = (userId) => {
  const result = fetchAllPosts()?.find(
    (p) => Number(p.userId) === Number(userId) // Find the post belonging to the given user
  );
  return result; // Return the found post or undefined
};

// Create a new post
export const createNewPost = (userId, caption, imageUrl) => {
  const user = getAllUsers().find((u) => Number(u.id) === Number(userId)); // Find the user by ID
  if (!user) {
    return { success: false, msg: "No user found" }; // If user doesn't exist, return error
  }
  // Push the new post to the posts array
  posts.push(new postModel(userId, caption, imageUrl));
  return posts; // Return the updated posts array
};

// Delete a post by its ID
export const deletePost = (id) => {
  const postIndex = posts?.findIndex((p) => Number(p.id) === Number(id)); // Find the index of the post
  if (postIndex >= 0) {
    const deletedPost = posts[postIndex]; // Store the deleted post
    const allComments = getAllComments(); // Get all comments
    if (allComments) {
      // Filter out the comments that belong to the deleted post
      const remainingComment = allComments?.filter(
        (c) => Number(c.postId) !== Number(id)
      );
      allComments?.length === 0; // Reset comments
      allComments.push(remainingComment); // Add remaining comments back
    }
    // Remove the post from the posts array
    posts.splice(postIndex, 1);
    return { sucess: true, deletedPost: deletedPost }; // Return the deleted post information
  } else {
    return { sucess: false, msg: "No post found !!" }; // Return error if the post doesn't exist
  }
};

// Edit a post by its ID
export const editPost = (id, caption, imageUrl) => {
  const postIndex = posts?.findIndex((p) => Number(p.id) === Number(id)); // Find the post by ID
  if (postIndex >= 0) {
    // Update the caption and image URL if provided, otherwise keep the existing values
    posts[postIndex].caption = caption ? caption : posts[postIndex]?.caption;
    posts[postIndex].imageUrl = imageUrl ? imageUrl : posts[postIndex].imageUrl;
    return { success: true, posts: posts[postIndex] }; // Return the updated post
  } else {
    return { success: false, msg: "No post found to edit !!" }; // Return error if post is not found
  }
};
